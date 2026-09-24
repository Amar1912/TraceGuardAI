import os
import sys
import csv
import json

CSV_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "case_pack.csv")
CASES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "cases")

def validate():
    print("=" * 50)
    print("CASE GENERATION VALIDATION")
    print("=" * 50)

    if not os.path.exists(CSV_FILE):
        print(f"Error: {CSV_FILE} missing!")
        sys.exit(1)

    expected_case_ids = []
    with open(CSV_FILE, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            expected_case_ids.append(row["case_id"])

    num_expected = len(expected_case_ids)
    print(f"Cases in case_pack.csv: {num_expected}")

    if not os.path.exists(CASES_DIR):
        print(f"Error: {CASES_DIR} directory missing!")
        sys.exit(1)

    actual_files = os.listdir(CASES_DIR)
    json_files = [f for f in actual_files if f.endswith(".json")]

    print(f"JSON files generated:     {len(json_files)}")

    valid_json_count = 0
    missing_cases = []
    extra_files = []
    schema_failures = []
    tg_write_failures = []

    for expected_id in expected_case_ids:
        filename = f"{expected_id}.json"
        filepath = os.path.join(CASES_DIR, filename)

        if not os.path.exists(filepath):
            missing_cases.append(expected_id)
            continue

        try:
            with open(filepath, mode="r", encoding="utf-8") as jf:
                data = json.load(jf)
                valid_json_count += 1

                # Validate required schema fields
                req_fields = ["case_id", "customer_id", "account_id", "transaction_id", "case_record", "evidence", "findings", "pre_evidence_state", "post_evidence_state", "sar_report", "graph_written"]
                for req in req_fields:
                    if req not in data:
                        schema_failures.append(f"{filename}: missing field '{req}'")

                if data.get("case_id") != expected_id:
                    schema_failures.append(f"{filename}: case_id mismatch '{data.get('case_id')}' != '{expected_id}'")

                if not data.get("graph_written", False):
                    tg_write_failures.append(expected_id)

        except Exception as e:
            schema_failures.append(f"{filename}: invalid JSON ({e})")

    for jf in json_files:
        cid = jf.replace(".json", "")
        if cid not in expected_case_ids:
            extra_files.append(jf)

    print(f"Cases processed:          {valid_json_count}")
    print(f"Valid JSON files:         {valid_json_count}")
    print(f"Missing cases:            {len(missing_cases)}")
    print(f"Extra files:              {len(extra_files)}")
    print(f"Schema failures:          {len(schema_failures)}")
    print(f"TigerGraph write failures:{len(tg_write_failures)}")

    status = "PASS" if (len(missing_cases) == 0 and len(schema_failures) == 0 and valid_json_count == num_expected) else "FAIL"
    print("\nSTATUS:", status)
    print("=" * 50)

    if status != "PASS":
        if missing_cases:
            print("Missing Cases:", missing_cases)
        if schema_failures:
            print("Schema Failures:", schema_failures)
        sys.exit(1)

if __name__ == "__main__":
    validate()

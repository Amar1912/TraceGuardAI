import pandas as pd
import pyTigerGraph as tg
from app.core.config import settings

class DatasetLoader:
    """
    Loads HHGOA_IEEE dataset into TigerGraph.
    """
    
    def __init__(self):
        self.host = settings.TIGERGRAPH_HOST
        self.graph_name = settings.TIGERGRAPH_GRAPH_NAME
        self.secret = settings.TIGERGRAPH_SECRET
        
    def load_transactions(self, csv_path: str):
        print(f"Loading transactions from {csv_path}...")
        df = pd.read_csv(csv_path)
        # 1. Connect to TG
        conn = tg.TigerGraphConnection(host=self.host, graphname=self.graph_name, gsqlSecret=self.secret)
        conn.getToken(self.secret)
        
        # 2. Upsert Vertices (Transaction)
        # Mapping IEEE columns to our schema
        # TransactionID -> v_id
        # TransactionAmt -> amount
        # card1 -> card_id
        # etc.
        # This is a placeholder for actual mapping
        pass

    def load_identity(self, csv_path: str):
        print(f"Loading identity from {csv_path}...")
        df = pd.read_csv(csv_path)
        pass

if __name__ == "__main__":
    # Example usage:
    # loader = DatasetLoader()
    # loader.load_transactions("data/train_transaction.csv")
    pass

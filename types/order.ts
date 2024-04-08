export interface ResultOrder {
    status: string;
    data: {
        order_id: string;
    }
}

export interface Order {
    order_id: string
    network_name: string
    order_type: string
    status: string
    transaction_hash: string
}

export interface NftOrder {
    order_id: string;
    user_id: string;
    status: string;
    network_name: string;
    entity_type: string;
    collection_address: string;
    nft_id: string;
    order_type: string;
    tx_hash: string;
  }
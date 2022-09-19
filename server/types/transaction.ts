import API_Reference from "./api_reference";

export default interface Transaction {
    transaction_id: number,
    type: "add" | "edit" | "recover" | "remove" | "sell"
    timestamp: number,
    old_item: API_Reference,
    new_item: API_Reference
}
import Item from "./item";
import API_Reference from "./api_reference"

export default interface ItemLog extends Item {
    original_item_id: API_Reference
}
# API Documentation

## Common models

### `API_ERROR`

Contains information about an error

```json
{
    "error": "string"
}
```

### `API_INFO`

Contains information about the api

```json
{
    "version": "string",
    "mysql_version": "string"
}
```

### `API_ITEM`

Contains information about a single item from the shop

```json
{
    "id": "int",
    "name": "string",
    "amount": "int",
    "costs": "float",
    "image": "url",
    "url": "url"
}
```

### `API_ITEM_STATS`

Contains stats of a single `API_ITEM`

```json
{
    "chart": "url",
    "sold": "ARRAY[API_TRANSACTION]",
    "removed": "ARRAY[API_TRANSACTION]",
    "added": "ARRAY[API_TRANSACTION]",
    "edits": "ARRAY[API_TRANSACTION]",
    "item": "API_REFERENCE"
}
```

### `API_REFERENCE`

Links to more content, to make the api faster

```json
{
    "name": "string",
    "url": "url"
}
```

### `API_TRANSACTION`

Describes a single transaction of an item

```json
{
    "id": "int",
    "type": "add | edit | recover | remove | sell ",
    "timestamp": "int",
    "old_item": "API_ITEM",
    "new_item": "API_ITEM",
    "item": "API_REFERENCE"
}
```

## Paths

### `GET: /api`

Get information about the api

**returns** `API_INFO`

### `GET: /api/items`

Get all items from the shop

**returns** `Array[API_ITEM]`

### `POST: /api/item/new`

Creates a new item and returns it

**returns** `API_ITEM`

### `GET: /api/item/{item_id}`

Get information of a single item

**returns** `API_ITEM`

### `DELETE: /api/item/{item_id}`

Delete a single item

**returns** `null`

### `PUT: /api/item/{item_id}`

Set information of a single item
Takes an `API_ITEM` as argument (from request body)

**returns** `API_TRANSACTION`

### `GET: /api/item/{item_id}/recover`

Recover a deleted item

**returns** `API_ITEM`

### `GET: /api/item/{item_id}/stats`

Get all stats of the item

**returns** `API_ITEM_STATS`

### `GET: /api/item/{item_id}/transactions`

Get all transaction that were applied to the item

**returns** `Array[API_TRANSACTION]`

### `DELETE: /api/item/{item_id}/transactions`

Delete all transaction of the item

**returns** `Array[API_TRANSACTION]`

### `GET: /api/item/{item_id}/transaction/{local_transaction_id}`

Get a specific item transaction. 

**returns** `API_TRANSACTION` (with global transaction_id)

### `DELETE: /api/item/{item_id}/transaction/{local_transaction_id}`

Delete a specific item transaction.

**returns** `null`

### `GET: /api/transactions`

Get all Transitions

**returns** `Array[API_TRANSACTION]`

### `DELETE: /api/transactions`

Delete all Transitions

**returns** `null`

### `GET: /api/transaction/{transaction_id}`

Get a specific Transitions

**returns** `API_TRANSACTION`

### `DELETE: /api/transaction/{transaction_id}`

Delete specific Transition

**returns** `null`
# API Documentation

## Common models

You can find the models in the ERM ([>database](./database.md)).

These models are modified, because all references to other tables are resolved.

For example:  Actions having a reference to the employee-table.

This reference is resolved and now there is an employee-object.

One exception: Errors

```ts
interface error {
    type: string,
    source:  "internal" | "database" | "user" | "unknown",
    msg: string
}
```

## Paths

### *Items*

### `GET: /api/items`

Get all items from the shop

**returns** `Array[Item]`

### `POST: /api/items/new`

Creates a new item and returns it

**returns** `Item`

### `GET: /api/items/{item._id}`

Get information of a single item

**returns** `item`

### `DELETE: /api/items/{item._id}`

Delete a single item

**returns** `null`

### `PUT: /api/items/{item._id}`

Set information of a single item
Takes an `Item` as argument (from request body)

**returns** `Action`

### `GET: /api/items/{item._id}/recover`

Recover a deleted item

**returns** `Item`

### `GET: /api/items/{item._id}/actions`

Get all actions, that were applied to the item

**returns** `Array[Action]`

### `DELETE: /api/items/{item._id}/actions`

Delete all transaction of the item

**returns** `Array[Action]`

### *Logged Items*

### `GET: /api/logged-items/`

Get all logged items

**returns** `Array[LoggedItem]`

### `GET: /api/logged-items/{loggedItem._id}`

Get a logged item from id

**return** `Array[LoggedItem]`

### *Actions*

### `GET: /api/actions`

Get all actions

**returns** `Array[Action]`

### `DELETE: /api/actions`

Delete all actions

**returns** `null`

### `GET: /api/actions/{action._id}`

Get a specific actions

**returns** `Action`

### `DELETE: /api/actions/{action._id}`

Delete specific action

**returns** `null`
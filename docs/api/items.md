# Paths for /api/items

## `GET: /api/items`

Get all items from the shop

**returns** `Array[Item]`

## `POST: /api/items/new`

Creates a new item and returns it

**returns** (new) `Item`

## `GET: /api/items/{item._id}`

Get information of a single item

**returns** `item`

## `DELETE: /api/items/{item._id}`

Delete a single item

**returns** `null`

## `PUT: /api/items/{item._id}`

Set information of a single item
Takes an (partial) `Item` as argument (from request body)

**returns** (new) `Item`

## `GET: /api/items/{item._id}/recover`

> Not implemented yet

Recover a deleted item

**returns** `Item`

## `GET: /api/items/{item._id}/versions`

Get all recent versions, but not the latest

**returns** `Array[items.versioning]`

## `GET: /api/items/{item._id}/versions/{item._id,_version}`

Get a single recent version (doesn't contain the latest!)

**returns** `items.versioning`
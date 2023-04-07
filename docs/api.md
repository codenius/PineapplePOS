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

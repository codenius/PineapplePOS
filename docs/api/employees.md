# Paths for /api/employees

## `POST: /api/employees/register`

Create new employee (you don't need any permissions to do that), your access level would be "read".
You may get an error, because this usernames are unique.
If it was successful you get redirected to the login site.

**returns** `null`

## `POST: /api/employees/login`

Login an employee. On success the headers will contain a set-cookie attribute.
This cookie is used for authentication!

**returns** `null`

## `POST: /api/employees/logout`

Logout an employee. IDK what happens there :D

**return** `null`

## `DELETE: /api/employees/:id`

> not finished yet

Deletes an employee, requires admin level

**return** (deleted) `Employee`

## `PUT: /api/employees/:id`

> not finished yet

Edit an employees data, requires admin level

**return** `Employee` (should be null in a later version, so don't use this return value)

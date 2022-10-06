# Database Structure

[Entity Relationship Model](https://dbdiagram.io/d/633d9e08f0018a1c5f9ee8ce)

## Why MongoDB and not MySQL?

MongoDB gives us the chance to work with mongoose. 
Mongoose is a validator, model handler and our database connector.
A next advantage is, of course, the security. 
Because this is an open source project and not our code it has much less security issues.
MongoDB brings also a big advantage to the project: 
Because we are using Docker MongoDB gives us the possibility to save data on a docker volume.
Which means that we save the data directly on the local system.
So we can easily make backups, recovers, ...

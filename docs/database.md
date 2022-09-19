# Database Structure

## Tables

### Items

contains all items of the sale-point

**Structure:**
```mysql
CREATE TABLE Items (
    item_id int(8) auto_increment unique,
    name varchar(30) NOT NULL,
    amount int(6) NOT NULL,
    cost float(9) NOT NULL,
    deleted ENUM(true, false) NOT NULL,
    image varchar(200),
    
    PRIMARY KEY (item_id)
)
```

### Transactions

contains all transactions of all items

**Structure:**
```mysql
CREATE TABLE Transactions (
    transaction_id int(8) auto_increment unique,
    type ENUM(add, edit, recover, remove, sell),
    timestamp int(40),
    old_item int(8),
    new_item int(8),
    
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (old_item) REFERENCES ItemLog(old_item),
    FOREIGN KEY (new_item) REFERENCES ItemLog(new_item)
)
```

### ItemLog

contains older items, that are used on Transaction Logs, to recover old states

**Structure:**
```mysql
CREATE TABLE ItemLog (
    item_id int(8) auto_increment unique,
    original_item_id int(8),
    name varchar(30) NOT NULL,
    amount int(6) NOT NULL,
    cost float(9) NOT NULL,
    deleted ENUM(true, false) NOT NULL,
    image varchar(200),
    
    PRIMARY KEY (item_id),
    FOREIGN KEY (original_item_id) REFERENCES Items(original_item_id)
)
```
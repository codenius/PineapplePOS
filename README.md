# PineapplePOS 🍍

PineapplePOS is a simple and easy-to-use inventory management software designed for small shops and sales. Instead of relying on barcode scanning, it uses a grid-based interface to select products, making it a good choice for shops with a smaller range of products while not requiring specalized barcode scanning hardware.

## Features

- **User-Friendly Interface**: Select products from a grid without needing specialized hardware like a barcode scanner.
- **Flexible User Roles**: Supports four distinct roles with tailored privileges.
- **Stock Management**: Add, edit, and remove products with attributes like name, amount in stock, price, category, and more.
- **Sales Tracking**: Perform sales with a simple and intuitive interface and stay on top of your inventory.

## Installation

### Requirements

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed (use Docker Desktop for Windows).

### Steps

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate into the cloned directory:

   ```bash
   cd <repository_directory>
   ```

3. Build and start the application for the first time:

   ```bash
   docker-compose up
   ```

## Setup

1.  Open your browser and navigate to
    http://localhost:80
2.  Log in with the default credentials:
    - **Username**: `admin`
    - **Password**: `admin`
3.  Use the gear icon to access **User Management**:
    - Change the admin password for security reasons.
    - Create and configure additional users as needed.

## Run

1. Navigate into the cloned directory:

   ```bash
   cd <repository_directory>
   ```

2. Start the application:

   ```bash
   docker-compose up
   ```

3. Open your browser and navigate to
   http://localhost:80

Stop all services using `Ctrl + C`.

## User Roles

PineapplePOS offers four user roles with different levels of access:

- **Admin**: Full privileges, including the ability to manage users.
- **Edit**: Full access to edit the inventory.
- **Sell**: Limited to performing sales via the shop interface.
- **Read**: View-only access to data without modification privileges.

## How to use

### Stock Management

- Use the **Stock** page to:
  - Create, edit, and delete products.
  - Modify attributes such as:
    - Name
    - Amount in stock
    - Price
    - Category
    - Image
    - Producing company/brand
- Use a products barcode or barcode number to quickly add it to the store by pulling name and image from [Open Food Facts](https://world.openfoodfacts.org)

### Sales

- Use the **Shop** page to:
  - Add items to the shopping bag.
  - Show total due and calculate change.
  - Complete sales transactions.
- Items highlighted in
  - yellow are low in stock
  - red are very low in stock

## Feedback

**We love feedback!** Let us know what you think about this application. Bug reports, feature requests or asking for help: it's all very welcome. Use GitHub issues on this repository for these and other concerns.

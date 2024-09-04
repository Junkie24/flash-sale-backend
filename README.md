# Flash Sale Backend

## Overview

The Flash Sale Backend is a Node.js application designed to manage flash sales in an e-commerce platform. It leverages MongoDB for data storage and includes features to handle high-concurrency scenarios, manage stock accurately, and provide a robust API for handling sales and inventory operations.

## Features

- **RESTful API**: Endpoints for managing sales and inventory.
- **Pagination and Sorting**: Retrieve items with pagination and sorted by creation date.
- **Error Handling**: Meaningful error messages and appropriate HTTP status codes.
- **Concurrency Handling**: Ensures data consistency using MongoDB transactions.


## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harshit-2410/flash-sale-backend
   cd flash-sale-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following variables:

   ```bash
   PORT = your_port
   MONGO_URI=your_mongo_db_uri
   ```

4. **Run the server:**

   ```bash
   npm start
   ```

## Usage

1. **Create a new item:**

   ```bash
   POST /items/create
   ```

   - Body:
     ```json
     {
       "name": "Item Name",
       "stock": "100"
     }
     ```

    - Response:
     ```json
     {
      "message": "Item added successfully",
      "item": {
        "_id": "5f8d0d55b54764421b7156c0",
        "name": "Item Name",
        "stock": 100,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "__v": 0
       }
     }
     ```

2. **View Items:**

   ```bash
   GET /items/view
   ```

   - Query:

     ```json
     {
       "page": 1,
       "limit": 10
     }
     ```

    - Response:
     ```json
    {
     "items": [
     {
      "_id": "5f8d0d55b54764421b7156c0",
      "name": "Item Name",
      "stock": 100,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "__v": 0
     }
     // More items...
     ],
     "totalItems": 100,
     "totalPages": 10,
     "currentPage": 1
    }
     ```

3. **Create A Sale**

   ```bash
   POST /sales/:item_id
   ```

   Item_id is valid mongoId of product

   - Body:
     ```json
     
       {
        "quantity" : "5"
       }
     
     ```
   - Response:
     ```json
      {
       "message": "Sale successful",
        "sale": {
        "_id": "5f8d0d55b54764421b7156c1",
        "item": "5f8d0d55b54764421b7156c0",
        "quantity": 5,
        "timestamp": "2023-01-01T00:00:00.000Z",
        "__v": 0
        }
      }

     ```
    
***Few items get added automatically as soon as the server starts running.Users can fetch the item_id using the API.***

# Requirements

## API Endpoints

### Products

**GET** `/products` - Get a list of all products

**Response**

```
[
    {
        "id": 1,
        "name": "Racecar",
        "price": "7.00",
        "category": "Toy"
    }
]
```

- GET /product/:id - Get a single product by ID
- POST /products - Create a new product (token required)

### Orders

- GET /orders/:status/:id - Get all orders from a user categorized by status (token required)
- GET /orders/:id - Get all orders from a user (token required)
- POST /orders - Create a new order (token required)

### Users

- GET /users - get a list of all users (token required)
- GET /users/:id get a user by id (token required)
- POST /users - create a user
- POST /usrs/authenticate - authenticate a user

## Models

### Order

| Property | Type   | Description                                       |
| -------- | ------ | ------------------------------------------------- |
| id       | number | An optional unique identifier for the order.      |
| user_id  | number | The ID of the user who placed the order.          |
| quantity | number | The quantity of items in the order.               |
| status   | string | The status of the order (e.g. "pending", "paid"). |

### Order Product

| Property   | Type   | Description                                          |
| ---------- | ------ | ---------------------------------------------------- |
| id         | number | An optional unique identifier for the order product. |
| order_id   | number | An optional ID of the order that the product is in.  |
| product_id | number | The ID of the product associated with the order.     |

### Product

| Property | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| id       | number | An optional unique identifier for the product. |
| price    | number | The price of the product.                      |
| category | string | The category the product belongs to.           |
| name     | string | The name of the product.                       |

### User

| Property  | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| id        | number | An optional unique identifier for the user. |
| firstName | string | The first name of the user.                 |
| lastName  | string | The last name of the user.                  |
| password  | string | The password for the user's account.        |

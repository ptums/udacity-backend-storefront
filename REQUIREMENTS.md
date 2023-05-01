# Requirements

## API Endpoints

### Products

**GET** `/products` - returns an array of all products

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

**GET** `/product/:id` - returns an object of a single product based on it's id.

**Response**

```
{
    "id": 1,
    "name": "Racecar",
    "price": "7.00",
    "category": "Toy"
}
```

**POST** `/products` - create a new product. (authorization required)

**Body**

```
{
    "id": 3,
    "name": "Water gun",
    "price": "4.50",
    "category": "Toy"
}
```

**Response**

```
{
    "id": 3,
    "name": "Water gun",
    "price": "4.50",
    "category": "Toy"
}
```

### Orders

**GET** `/orders/:status/:id` - returns an array of orders based with a specific status "active" or "complete" based on the user's id.(authorization required)

**Response**

```
[
    {
        "id": 1,
        "quantity": 5,
        "status": "active"
    }
]
```

**GET** `/orders/:id` - returns an array of orders based on the user's id. (authorization required)

**Response**

```
[
    {
        "id": 1,
        "quantity": 5,
        "status": "active"
    }
]
```

**POST** `/orders` - create a new order. (authorization required)

**Body**

```
{
    "user_id": 1,
    "quantity": 10,
    "status": "complete",
    "product_id": 1
}
```

**Response**

```
{
    "id": 2,
    "order_id": 2,
    "product_id": 1
}
```

### Users

**GET** `/users` - returns an array of all users. (authorization required)

**Response**

```
[
    {
        "id": 1,
        "firstname": "Tom",
        "lastname": "Thumb",
        "password": "$2b$10$JeJnIxIJ9ZkKN1/3o2xSMugzIR9VwoOgPT5K8JPVu3Ejtm/Jnvmwe"
    }
]
```

**GET** `/users/:id` - returns an array of all users. (authorization required)

**Response**

```
{
    "id": 1,
    "firstname": "Tom",
    "lastname": "Thumb",
    "password": "$2b$10$JeJnIxIJ9ZkKN1/3o2xSMugzIR9VwoOgPT5K8JPVu3Ejtm/Jnvmwe"
}
```

**POST** `/users` - creates a new user and returns a JWT token.

**Body**

```
{
    "firstName": "Peter",
    "lastName": "Pan",
    "password": "neverland123"
}
```

**Response**

```
eyJhbGciOiJIUzI1NiJ9.JDJiJDEwJGV1WklWVlpRRnBoVll2Z3phTndaZS5qeWJIdDZhL2ZINi9pMkhtVFdIcXFlSW85U3ZLeEgy.ROvd_fcMQP7scg4iSC_2hRh8yc0w3FWh1qtaQCkbvnA
```

**POST** `/users/authenticate` - authenticates a new user and returns a JWT token.

**Body**

```
{
    "firstName": "Peter",
    "lastName": "Pan",
    "password": "neverland123"
}
```

**Response**

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4MjkzNjE2MCwiZXhwIjoxNjgyOTM5NzYwfQ.FbQbYgCH9MLn9fXpaaRGV-klmgg38295IB9JZLaLSRc"
}
```

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

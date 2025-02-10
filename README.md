# RESTful API for Data Management
This is a simple application for managing a product catalog, where users can view the catalog, but only authenticated and authorized users can access their profiles and create, update, or delete products in the catalog.


## Run Project locally
---
- Clone this project on your computer
    ```sh
    git clone git@github.com:ajiibrahim01/talentgrowth-purplebox-backend_intern.git
    ```
- Install Node.js, npm, and depedencies needed if you don't have it (check the depedencies on package.json)
  ```sh
    node -v
    npm -v
    ```
- Go to the project then go to file connection.js in config folder
- Change the value of dbURI variable to your mongodb URL
  ```sh
    mongodb://username:password@host:port/database (e.g. 'mongodb://localhost:27017/purplebox_data')
    ```
- Create products collection name in your mongo database with the dummy data on folder data
- Run the project
    ```sh
    npm run dev
    ```
- The project will run on port 3000
     ```sh
     http://localhost:3000
    ```
    
## API Documentation

---
### 1. **POST /auth/register**

- **Description**: Register a new user.
- **Request Body**:
    ```json
    {
      "name": "John Doe",
      "age": 30,
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

#### **Success Response:**
- **Status**: `201 Created`
    ```json
    {
      "message": "User registered successfully"
    }
    ```

#### **Failure Responses:**
- **400 Bad Request**: Missing or invalid data in the request.
    - Example:
    ```json
    {
      "errors": [
        { "message": "Name is required" },
        { "message": "Email already registered" }
      ]
    }
    ```
- **409 Conflict**: Email already registered.
    - Example:
    ```json
    {
      "message": "Email already registered"
    }
    ```

---

### 2. **POST /auth/login**

- **Description**: Login a user and obtain a JWT token.
- **Request Body**:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

#### **Success Response:**
- **Status**: `200 OK`
    ```json
    {
      "token": "JWT_TOKEN_HERE"
    }
    ```

#### **Failure Responses:**
- **401 Unauthorized**: Invalid email or password.
    - Example:
    ```json
    {
      "message": "Invalid credentials"
    }
    ```
- **400 Bad Request**: Missing or invalid data in the request.
    - Example:
    ```json
    {
      "errors": [
        { "message": "Email is required" },
        { "message": "Password is required" }
      ]
    }
    ```

---

### 3. **GET /profile**

- **Description**: Get the authenticated user's profile information.
- **Headers**:
    - `Authorization: Bearer JWT_TOKEN`
  
#### **Success Response:**
- **Status**: `200 OK`
    ```json
    {
      "data": {
        "name": "John Doe",
        "age": 30
      }
    }
    ```

#### **Failure Responses:**
- **401 Unauthorized**: If the user is not authenticated.
    - Example:
    ```json
    {
      "message": "Unauthorized access"
    }
    ```

---

## **Product Routes**

### 1. **POST /items**

- **Description**: Create a new product (authentication required).
- **Headers**:
    - `Authorization: Bearer JWT_TOKEN`
- **Request Body**:
    ```json
    {
      "name": "Product 1",
      "description": "This is a great product",
      "price": 20.99,
      "category": "Electronics"
    }
    ```

#### **Success Response:**
- **Status**: `201 Created`
    ```json
    {
      "data": {
        "id": 1,
        "name": "Product 1",
        "description": "This is a great product",
        "price": 20.99,
        "category": "Electronics",
        "createdAt": "2025-02-10T08:00:00.000Z",
        "updatedAt": "2025-02-10T08:00:00.000Z"
      },
      "message": "Product created successfully"
    }
    ```

#### **Failure Responses:**
- **400 Bad Request**: Invalid or missing required fields.
    - Example:
    ```json
    {
      "errors": [
        { "message": "Name is required" },
        { "message": "Price must be a positive number" }
      ]
    }
    ```
- **401 Unauthorized**: If the user is not authenticated.
    - Example:
    ```json
    {
      "message": "Unauthorized access"
    }
    ```

---

### 2. **GET /items** (e.g. with pagination GET /items?page=1&limit=10)

- **Description**: Get a list of all products with optional pagination.
- **Request Parameters**:
    - `page` (optional): Page number for pagination.
    - `limit` (optional): Number of items per page.

#### **Success Response:**
- **Status**: `200 OK`
    ```json
    {
      "items": [
        {
          "id": 1,
          "name": "Product 1",
          "description": "This is a great product",
          "price": 20.99,
          "category": "Electronics",
          "createdAt": "2025-02-10T08:00:00.000Z",
          "updatedAt": "2025-02-10T08:00:00.000Z"
        },
        {
          "id": 2,
          "name": "Product 2",
          "description": "This is another great product",
          "price": 15.99,
          "category": "Home Appliances",
          "createdAt": "2025-02-10T08:00:00.000Z",
          "updatedAt": "2025-02-10T08:00:00.000Z"
        }
      ],
      "total": 2,
      "page": 1,
      "totalPages": 1
    }
    ```

#### **Failure Response:**
- **400 Bad Request**: Invalid pagination parameters.
    - Example:
    ```json
    {
      "message": "Invalid pagination parameters"
    }
    ```

---

### 3. **GET /items/:id**

- **Description**: Get a single product by its ID.
- **Path Parameters**:
    - `id`: The ID of the product.

#### **Success Response:**
- **Status**: `200 OK`
    ```json
    {
      "data": {
        "id": 1,
        "name": "Product 1",
        "description": "This is a great product",
        "price": 20.99,
        "category": "Electronics",
        "createdAt": "2025-02-10T08:00:00.000Z",
        "updatedAt": "2025-02-10T08:00:00.000Z"
      }
    }
    ```

#### **Failure Responses:**
- **404 Not Found**: If the product is not found by the given ID.
    - Example:
    ```json
    {
      "message": "Product not found"
    }
    ```

---

### 4. **PUT /items/:id**

- **Description**: Update an existing product by its ID (authentication required).
- **Headers**:
    - `Authorization: Bearer JWT_TOKEN`
- **Path Parameters**:
    - `id`: The ID of the product to update.
- **Request Body**:
    ```json
    {
      "name": "Updated Product",
      "description": "Updated description",
      "price": 25.99,
      "category": "Updated Category"
    }
    ```

#### **Success Response:**
- **Status**: `200 OK`
    ```json
    {
      "success": true,
      "data": {
        "id": 1,
        "name": "Updated Product",
        "description": "Updated description",
        "price": 25.99,
        "category": "Updated Category",
        "createdAt": "2025-02-10T08:00:00.000Z",
        "updatedAt": "2025-02-10T09:00:00.000Z"
      },
      "message": "Product updated successfully"
    }
    ```

#### **Failure Responses:**
- **400 Bad Request**: Invalid data or missing fields.
    - Example:
    ```json
    {
      "errors": [
        { "message": "Price must be a positive number" }
      ]
    }
    ```
- **404 Not Found**: Product with the given ID not found.
    - Example:
    ```json
    {
      "message": "Product not found"
    }
    ```
- **401 Unauthorized**: If the user is not authenticated.
    - Example:
    ```json
    {
      "message": "Unauthorized access"
    }
    ```

---

### 5. **DELETE /items/:id**

- **Description**: Delete a product by its ID (authentication required).
- **Headers**:
    - `Authorization: Bearer JWT_TOKEN`
- **Path Parameters**:
    - `id`: The ID of the product to delete.

#### **Success Response:**
- **Status**: `200 OK`
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

#### **Failure Responses:**
- **404 Not Found**: If the product is not found by the given ID.
    - Example:
    ```json
    {
      "message": "Product not found"
    }
    ```
- **401 Unauthorized**: If the user is not authenticated.
    - Example:
    ```json
    {
      "message": "Unauthorized access"
    }
    ```

---

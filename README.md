# 🛒 Shopping Cart API

A full-featured **RESTful API** for an e-commerce shopping cart, built with **Node.js**, **Express**, and **Prisma ORM**. Supports product browsing, filtering, cart management, and is ready for frontend integration.

---

## 🚀 Features

- Product listing with pagination, search, filtering, and sorting
- Get product by ID or slug
- Shopping cart management per user
- Prisma ORM with database support
- Clean REST API architecture
- CORS-ready for frontend apps

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL or SQLite (via Prisma)
- dotenv
- CORS

---

## 📂 API Endpoints

### 🧾 Products

| Method | Endpoint                    | Description                                |
|--------|-----------------------------|--------------------------------------------|
| GET    | `/api/products`             | List products with search, filter, sort, pagination |
| GET    | `/api/products/:id`         | Get product by ID                          |
| GET    | `/api/products/slug/:slug`  | Get product by slug                        |

#### ✅ Query Parameters for `/api/products`

| Param     | Description                             | Example                |
|-----------|-----------------------------------------|------------------------|
| `page`    | Page number (default: 1)                | `page=2`               |
| `limit`   | Items per page (default: 10, max: 100)  | `limit=20`             |
| `search`  | Search by product name/category         | `search=phone`         |
| `category`| Filter by category                      | `category=electronics` |
| `minPrice`| Minimum price filter                    | `minPrice=100`         |
| `maxPrice`| Maximum price filter                    | `maxPrice=500`         |
| `sort`    | Sort results                            | `sort=price_desc`      |

> 🧠 Supported `sort` values: `price_asc`, `price_desc`, `name_asc`, `name_desc`

---

### 🛒 Cart

| Method | Endpoint                            | Description                             |
|--------|-------------------------------------|-----------------------------------------|
| GET    | `/api/cart`                         | Get current user's cart (dev version)   |
| POST   | `/api/cart`                         | Add product to cart                     |
| PUT    | `/api/cart/:id`                     | Update quantity of a cart item          |
| DELETE | `/api/cart/user/:userId`            | Clear entire cart for a user            |
| DELETE | `/api/cart/:userId/:productId`      | Remove a single product from the cart   |

> 🛡️ `validateCartRequest` middleware is used for input validation on POST.

---

## 🌍 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/MongeziMasombuka/shopping-cart-api.git
cd shopping-cart-api
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup `.env`

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
PORT=3001
```

Or use PostgreSQL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
```

### 4. Setup Prisma and migrate database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the server

```bash
npm start
```

Visit: `http://localhost:3001/api/products`

---

## 📦 Environment Variables

| Key            | Required | Description                   |
| -------------- | -------- | ----------------------------- |
| `PORT`         | ✅        | Port for the server to run on |
| `DATABASE_URL` | ✅        | Prisma-supported database URL |

---

## 🌐 Deployment

This project is designed to work with:

* **Frontend**: Deployed on [Netlify](https://netlify.com/)
* **Backend**: Deployed on [Render](https://render.com/)

### 📋 Deploy on Render (Backend)

* Connect your GitHub repo
* Set `Build Command`: `npm install`
* Set `Start Command`: `npm start` or `node index.js`
* Add your environment variables (`DATABASE_URL`, `PORT`)

---

## 📌 Prisma Schema (Example)

```prisma
model Product {
  id       Int     @id @default(autoincrement())
  name     String
  slug     String  @unique
  category String
  price    Float
}

model CartItem {
  id        Int     @id @default(autoincrement())
  userId    String
  productId Int
  quantity  Int
  product   Product @relation(fields: [productId], references: [id])
}
```

---

## 🧪 Testing (Basic)

Use tools like [Postman](https://postman.com) or `curl`:

```bash
curl http://localhost:3001/api/products
curl -X POST -H "Content-Type: application/json" \
  -d '{"userId":"123", "productId":1, "quantity":2}' \
  http://localhost:3001/api/cart
```

---

## 🚧 Roadmap

* ✅ Product & Cart endpoints
* 🔜 Add User endpoints (JWT)
* 🔜 Add authentication (JWT)
* 🔜 Database validations
* 🔜 Docker support
* 🔜 Unit testing with Jest

---

## 🙌 Author

**Mongezi Masombuka**
🔗 [GitHub](https://github.com/MongeziMasombuka)


```

Let me know if you want to include example JSON responses or authentication flows next!
```

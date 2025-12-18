# 🛒 eCommerce API
*Start Date: 2025-12-18*  

---

## 📌 Overview
This is a simplified eCommerce API to handle all daily questions such as **inventory management**, **user authentication** and **cart actions**.

## 📖 What to learn
- JWT authentication & user management
- Database connection and management
- Testing automations

## 🧬 Tech Stack
- Node.js + TypeScript
- Express
- PostgreSQL + Prisma
- JWT
- Zod
- Jest
- Docker

## ❔ How to use
1. Install required dependencies with ``npm install``

## 📋 Technical Notes
- **Attributes**
    - User
        - ``id``
        - ``name``
        - ``email``
        - ``password_hash``
        - ``role``
        - ``created_at``
    - Product
        - ``id``
        - ``name``
        - ``description``
        - ``price``
        - ``stock``
        - ``is_active``
        - ``created_at``
    - Category
        - ``id``
        - ``name``
        - ``created_at``
    - ProductCategory
        - ``product_id``
        - ``category_id``
    - Cart
        - ``id``
        - ``user_id``
        - ``created_at``
    - CartItem
        - ``id``
        - ``cart_id``
        - ``product_id``
        - ``quantity``
        - ``unit_price``
    - Order
        - ``id``
        - ``user_id``
        - ``status``
        - ``total``
        - ``created_at``
- **Relationships**
    - ``User`` 1 - 1 ``Cart``
    - ``User`` 1 - N ``Orders``
    - ``Product`` N - N ``Category``
    - ``Cart`` 1 - N ``CartItem``
    - ``Order`` 1 - N ``OrderItem``

## 🗺️ Routes
- **Auth**
    - ``POST`` /auth/register
    - ``POST`` /auth/login
- **User**
    - ``GET`` /users/me
- **Product**
    - ``GET`` /products
    - ``GET`` /products/:id
    - ``POST`` /products (admin)
    - ``PUT`` /products/:id (admin)
    - ``DELETE`` /products/:id (admin)
- **Category**
    - ``GET`` /categories
    - ``POST`` /categories (admin)
- **Cart**
    - ``GET`` /cart
    - ``POST`` /cart/items
    - ``PUT`` /cart/items/:id
    - ``DELETE`` /cart/items/:id
- **Order**
    - ``POST`` /orders
    - ``GET`` /orders
    - ``GET`` /orders/:id
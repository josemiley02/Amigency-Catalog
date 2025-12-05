# 🎀 Amigency Catalog – Modern Product Showcase Platform

ClayEarrings Catalog is a lightweight and modern web application built for a handmade cold-porcelain (air-dry clay) jewelry business.  
The platform provides a clean public catalog for customers and a simple admin interface where the creator can upload new earrings, manage categories, and update product information — all without relying on external image hosting services.

This project was designed with accessibility and offline stability in mind, ensuring users with limited internet access can browse the catalog seamlessly.

---

## ✨ Features

### 🌸 Public Catalog (No Authentication Required)
- Browse all earrings and categories.
- Fast-loading UI optimized for low-bandwidth environments.
- Fully responsive layout for mobile users.

### 🔒 Admin Panel (Creator-only)
- Add new products with images directly from the local device.
- Create and edit categories, including category icons.
- Manage inventory and product visibility.
- All images are stored locally on the server — no external services needed.

### 🖼️ Local Image Uploading
- Images are stored inside the backend `/media/` directory.
- Easily served through Nginx or Django in development mode.
- Ideal for networks where access to cloud storage (AWS/GCP/Cloudinary) is limited.

---

## 🛠️ Tech Stack

### **Backend**
- **Django** – Fast and secure web framework.
- **Django REST Framework** – API endpoints for the frontend.
- **PostgreSQL** – Reliable database for structured product data.
- **Pillow** – Handles image uploads.
- **Local filesystem storage** for all product and category images.

### **Frontend**
- **Vue 3** with **TypeScript**
- **Vite** – Ultra-fast development server and build tool.
- **Axios** – HTTP client to interact with the backend API.
- **Pinia** (optional) – State management.
- Clean and reusable component architecture.
---

## 🚀 Getting Started

### 1️⃣ Backend Setup (Django)
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
````

Default backend URL (development):
`http://127.0.0.1:8000/`

### 2️⃣ Frontend Setup (Vue + Vite)

```bash
cd frontend
npm install
npm run dev
```

Default frontend URL (development):
`http://127.0.0.1:5173/`

---

## 🔗 API Overview

### `GET /api/products/`

Returns list of products with images and categories.

### `POST /api/products/`

Admin-only product creation with image upload.

### `GET /api/categories/`

List all product categories.

---

## 🎨 Purpose

This project was created to support a small handcrafted jewelry business by providing an elegant, simple, and fast digital catalog that works even in environments with restricted or unstable internet access.
It keeps full control of all data and media by avoiding third-party services entirely.

---

## 📄 License

MIT License — free to use, improve, and customize.

---

## 💖 Credits

Built with love for a handmade cold-porcelain jewelry business, focusing on creativity, simplicity, and accessibility.

# 🏨 Rentora — Scalable Hotel & Property Listing Platform

<p align="center">
  <strong>A modern, backend-driven platform for hotel & property listings</strong><br/>
  Built with scalability, clean architecture, and real-world backend practices
</p>

<p align="center">
  <a href="https://rentora-qzob.onrender.com/listings">
    <img src="https://img.shields.io/badge/🌐 Live Demo-Explore-success?style=for-the-badge" />
  </a>
  <a href="https://github.com/atharva-7504/Rentora">
    <img src="https://img.shields.io/badge/⭐ GitHub-Repository-black?style=for-the-badge" />
  </a>
</p>


---

## 📌 About Rentora

**Rentora** is a hotel and property listing platform where **property owners can list their properties** and **users can explore and rent them seamlessly**.

This project is a **backend-first full-stack application**, built to demonstrate:
- clean **MVC architecture**
- real-world **authentication & authorization**
- scalable **RESTful design**
- production-style **data modeling**

It focuses more on **how systems are built**, not just how they look.

---

## 🧱 Architecture — MVC Pattern

Rentora is structured using the **Model–View–Controller (MVC)** pattern to ensure separation of concerns and maintainable code.

### 📦 Models (Data Layer)
Defined using **Mongoose**:

- **User** – authentication, sessions, role-based authorization  
- **Listing** – property details, pricing, images, location  
- **Review** – ratings and feedback linked to listings  

Relationships are designed to reflect real production data flow.


### 🎮 Controllers (Business Logic)
Controllers contain all core logic:

- Authentication & authorization
- Listing CRUD operations
- Review handling
- Ownership & permission checks

This keeps routes clean and makes the application scalable.


### 🖼 Views (Presentation Layer)
- Built with **EJS**
- Dynamic rendering of backend data
- Reusable layouts and partials

---

## 🔑 Core Features

- 🔐 **Authentication & Authorization**  
  Session-based auth using Passport-Local, express-session, signed cookies, and role-based access control

- 🔄 **RESTful CRUD APIs**  
  Full CRUD operations for listings and reviews following REST principles

- ✅ **Validation & Error Handling**  
  Client-side validation, Joi schema validation, centralized Express error handling

- 🖼 **Image Upload & Storage**  
  Multer for uploads and Cloudinary for cloud storage

- 🗺 **Maps & Geolocation**  
  OpenStreetMap integration to convert addresses into coordinates and display maps

- 💬 **User Feedback**  
  Flash messages for login, signup, and listing actions

---

## 🛠 Tech Stack

<p align="left">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="52"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="52"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" width="52"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="52"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" width="52"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="52"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" width="52"/>
</p>

**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Authentication:** Passport-Local, express-session, signed cookies  
**Templating:** EJS  
**File Storage:** Multer, Cloudinary  
**Maps:** OpenStreetMap  

---

## 🚀 Installation & Running the Server

### 📌 Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd Rentora
```

2️⃣ Install Dependencies
```bash
npm install
```

3️⃣ Start the Server
```bash
node app.js
```

4️⃣ Open in Browser
```bash
http://localhost:3000/listings
```

---

## Project Showcase : 

<img width="1919" height="961" alt="Screenshot 2026-01-31 122425" src="https://github.com/user-attachments/assets/f7fb864b-4741-493f-ba6a-f1fe3001ef5f" />


<img width="1918" height="887" alt="Screenshot 2026-01-31 153759" src="https://github.com/user-attachments/assets/e6fc3c05-5b23-4b68-a84e-53557cf68e69" />


---

## 🌐 Live Demo

Check out **Rentora** in action:  
[🌐 Live Demo](https://rentora-qzob.onrender.com/listings)

---
```bash
If you find this project helpful, interesting, or inspiring, please give it a ⭐ on GitHub.  
Your support motivates me to continue building and improving projects like this!
```





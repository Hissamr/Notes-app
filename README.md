# 📝 Family Notes App

> A full-stack note-taking web application with role-based access control, designed for family collaboration and child note management.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://hissam-notes.vercel.app/)
[![GitHub](https://img.shields.io/badge/github-repo-blue?style=for-the-badge&logo=github)](https://github.com/Hissamr/Notes-app)

**🌐 Live Demo:** [https://hissam-notes.vercel.app/](https://hissam-notes.vercel.app/)

---

---

## 🎯 Project Overview

**Family Notes App** is a production-ready, full-stack web application that enables families to manage and organize notes with distinct role-based permissions for parents and children. The application features secure JWT authentication, RESTful API architecture, and a modern responsive UI.

### 🎥 Key Highlights

- **Full-Stack Architecture**: Spring Boot backend + React frontend
- **Production Deployment**: Deployed on Railway (backend) + Vercel (frontend)
- **Cloud Database**: PostgreSQL database with JPA/Hibernate ORM
- **Secure Authentication**: JWT-based stateless authentication with BCrypt encryption
- **RESTful API**: Clean API design following REST principles
- **Responsive Design**: Mobile-first, cross-browser compatible UI

---

## 🌟 Core Features

### 🔐 Role-Based Access Control

- **Parent Dashboard**: Monitor and manage children's notes
- **Child Dashboard**: Create, edit, and organize personal notes
- **Secure Authentication**: JWT-based authentication system
- **Family Linking**: Parents can link multiple children accounts

### 📋 Note Management

- **Rich Text Notes**: Create and edit notes with formatting
- **Folder Organization**: Organize notes into custom folders
- **Real-time Updates**: Live synchronization across devices
- **Search & Filter**: Find notes quickly with advanced filtering

### 🎨 Modern UI/UX

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Intuitive Interface**: Child-friendly design with easy navigation
- **Dark/Light Theme**: Comfortable viewing in any environment

---

## 🛠️ Technology Stack

### **Backend** (Spring Boot Microservice)

| Technology      | Version | Purpose                                  |
| --------------- | ------- | ---------------------------------------- |
| Java            | 21      | Core programming language                |
| Spring Boot     | 3.5.6   | Application framework                    |
| Spring Security | 6.x     | Authentication & authorization           |
| Spring Data JPA | 3.x     | ORM and data persistence                 |
| PostgreSQL      | Latest  | Production database                      |
| H2 Database     | Latest  | Development/testing database             |
| JWT (jjwt)      | 0.12.6  | Token-based authentication               |
| Maven           | 3.9+    | Build automation & dependency management |
| Lombok          | Latest  | Reduce boilerplate code                  |

### **Frontend** (React SPA)

| Technology   | Version  | Purpose                          |
| ------------ | -------- | -------------------------------- |
| React        | 18.2.0   | UI library with hooks            |
| React Router | 6.8.0    | Client-side routing              |
| Axios        | 1.6.0    | HTTP client for REST API         |
| Context API  | Built-in | Global state management          |
| CSS3         | -        | Modern styling with Flexbox/Grid |

### **DevOps & Deployment**

| Technology    | Purpose                      |
| ------------- | ---------------------------- |
| Railway       | Backend hosting + PostgreSQL |
| Vercel        | Frontend hosting + CDN       |
| Git/GitHub    | Version control              |
| Maven Wrapper | Consistent builds            |

---

## 🏗️ Architecture & Design Patterns

---

## 🏗️ Architecture & Design Patterns

### **Backend Architecture**

- **Layered Architecture**: Controller → Service → Repository → Entity
- **DTO Pattern**: Separation of API contracts from domain models
- **Repository Pattern**: Data access abstraction with Spring Data JPA
- **Dependency Injection**: Spring IoC container for loose coupling
- **JWT Filter Chain**: Custom authentication filter for stateless auth
- **Exception Handling**: Global exception handler with proper HTTP responses

### **Frontend Architecture**

- **Component-Based Design**: Reusable, modular React components
- **Context Pattern**: Authentication state management across components
- **Custom Hooks**: Reusable logic extraction
- **Service Layer**: Centralized API communication with Axios interceptors
- **Route Guards**: Protected routes based on authentication status

---

## 🚀 Getting Started

### **Prerequisites**

```bash
Java 21+
Node.js 16+
Maven 3.9+
Git
```

### **Local Development Setup**

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/Hissamr/Notes-app.git
cd Notes-app
```

#### 2️⃣ Backend Setup

```bash
cd backend/notesapp

# Install dependencies and run
./mvnw clean install
./mvnw spring-boot:run

# Backend starts at http://localhost:8080
# H2 Console: http://localhost:8080/h2-console
```

#### 3️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Frontend starts at http://localhost:3000
```

---

## 📡 API Documentation

### **Base URL**

- **Development**: `http://localhost:8080/api`
- **Production**: `https://notes-app-production-9996.up.railway.app/api`

### **Authentication Endpoints**

```http
POST   /api/auth/register         # Register new user (PARENT/CHILD)
POST   /api/auth/login            # Login and receive JWT token
GET    /api/auth/me               # Get authenticated user details
POST   /api/auth/link-child       # Parent links child account
GET    /api/auth/children         # Get parent's linked children
POST   /api/auth/forgot-password  # Request password reset
POST   /api/auth/reset-password   # Reset password with token
```

### **Notes Endpoints** (Authenticated)

```http
GET    /api/notes                 # Get user's notes
POST   /api/notes                 # Create new note
PUT    /api/notes/{id}            # Update note
DELETE /api/notes/{id}            # Delete note
GET    /api/notes/child/{childId} # Get child's notes (parent only)
```

### **Folders Endpoints** (Authenticated)

```http
GET    /api/folders               # Get user's folders
POST   /api/folders               # Create new folder
PUT    /api/folders/{id}          # Update folder
DELETE /api/folders/{id}          # Delete folder
```

### **Request/Response Examples**

<details>
<summary><b>Register User</b></summary>

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "PARENT"
}

# Response (200 OK)
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "PARENT"
}
```

</details>

<details>
<summary><b>Create Note</b></summary>

```bash
POST /api/notes
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the note content",
  "folderId": 1
}

# Response (201 Created)
{
  "id": 1,
  "title": "My First Note",
  "content": "This is the note content",
  "folderId": 1,
  "createdAt": "2025-10-27T10:30:00Z",
  "updatedAt": "2025-10-27T10:30:00Z"
}
```

</details>

---

## 🗂️ Project Structure

```
Notes-app/
├── backend/notesapp/
│   ├── src/main/java/com/hissam/notesapp/
│   │   ├── config/              # Security, CORS, JWT configuration
│   │   │   ├── CorsConfig.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   └── SecurityConfig.java
│   │   ├── controller/          # REST API controllers
│   │   │   ├── AuthController.java
│   │   │   ├── NoteController.java
│   │   │   └── FolderController.java
│   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   └── NoteDTO.java
│   │   ├── entity/              # JPA entities
│   │   │   ├── User.java
│   │   │   ├── Note.java
│   │   │   └── Folder.java
│   │   ├── enums/               # Enumerations
│   │   │   └── Role.java
│   │   ├── exception/           # Custom exceptions
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── repository/          # JPA repositories
│   │   │   ├── UserRepository.java
│   │   │   ├── NoteRepository.java
│   │   │   └── FolderRepository.java
│   │   ├── security/            # JWT utilities
│   │   │   └── JwtTokenProvider.java
│   │   └── service/             # Business logic
│   │       ├── AuthService.java
│   │       ├── NoteService.java
│   │       └── FolderService.java
│   ├── src/main/resources/
│   │   ├── application.properties           # Development config
│   │   └── application-prod.properties      # Production config
│   ├── pom.xml                  # Maven dependencies
│   ├── railway.json             # Railway deployment config
│   ├── Procfile                 # Process file for Railway
│   └── nixpacks.toml            # Nixpacks build configuration
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── favicon.ico
    ├── src/
    │   ├── components/          # Reusable UI components
    │   │   ├── Navbar.jsx
    │   │   ├── NoteItem.jsx
    │   │   ├── NotesList.jsx
    │   │   ├── NoteForm.jsx
    │   │   └── FoldersList.jsx
    │   ├── contexts/            # React Context providers
    │   │   └── AuthContext.jsx
    │   ├── pages/               # Page components
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── ParentDashboard.jsx
    │   │   ├── ForgotPasswordPage.jsx
    │   │   └── ResetPasswordPage.jsx
    │   ├── services/            # API service layer
    │   │   └── api.jsx
    │   ├── App.jsx              # Root component
    │   ├── App.css
    │   └── index.jsx
    ├── package.json
    └── vercel.json              # Vercel deployment config
```

---

## 🔒 Security Implementation

### **Authentication & Authorization**

- ✅ **JWT Tokens**: Stateless authentication with HS256 algorithm
- ✅ **BCrypt Hashing**: Password encryption with salt (strength: 10)
- ✅ **Role-Based Access**: `PARENT` and `CHILD` roles with distinct permissions
- ✅ **Token Expiration**: 24-hour token lifetime with secure refresh flow
- ✅ **CORS Configuration**: Whitelist-based origin validation

### **Data Protection**

- ✅ **SQL Injection Prevention**: JPA parameterized queries
- ✅ **XSS Protection**: Input sanitization and validation
- ✅ **CSRF Protection**: Token-based request validation
- ✅ **HTTPS Enforcement**: TLS encryption in production
- ✅ **Environment Variables**: Sensitive data in environment configs

### **Password Reset Flow**

1. User requests password reset with email
2. Backend generates unique token (1-hour expiry)
3. Token sent to user (email integration ready)
4. User submits new password with token
5. Token validated and password updated

---

## 🚀 Deployment

### **Production URLs**

- **Frontend**: [https://hissam-notes.vercel.app/](https://hissam-notes.vercel.app/)
- **Backend API**: `https://notes-app-production-9996.up.railway.app/api`

### **Deployment Architecture**

```
┌─────────────────┐
│   Vercel CDN    │  ← React Frontend (SPA)
│   (Frontend)    │     - Optimized builds
└────────┬────────┘     - Auto SSL/HTTPS
         │              - Global CDN
         │ API Calls
         ↓
┌─────────────────┐
│  Railway PaaS   │  ← Spring Boot Backend
│   (Backend)     │     - Auto-scaling
└────────┬────────┘     - Health monitoring
         │              - Environment vars
         │ SQL Queries
         ↓
┌─────────────────┐
│   PostgreSQL    │  ← Production Database
│   (Database)    │     - Automated backups
└─────────────────┘     - Connection pooling
```

### **Backend Deployment (Railway)**

1. Connected to GitHub repository
2. Auto-deploys on push to `main` branch
3. Environment variables:
   - `SPRING_PROFILES_ACTIVE=prod`
   - `JWT_SECRET=<base64-encoded-secret>`
   - `CORS_ALLOWED_ORIGINS=https://hissam-notes.vercel.app`
4. PostgreSQL database provisioned automatically

### **Frontend Deployment (Vercel)**

1. Connected to GitHub repository
2. Auto-deploys on push to `main` branch
3. Build command: `npm run build`
4. Environment variable:
   - `REACT_APP_API_URL=https://notes-app-production-9996.up.railway.app/api`

---

## 🧪 Testing

### **Manual Testing**

1. **Visit**: [https://hissam-notes.vercel.app/](https://hissam-notes.vercel.app/)
2. **Register** as a PARENT user
3. **Create** notes and folders
4. **Register** a CHILD user (different browser/incognito)
5. **Link** child to parent account
6. **Test** cross-role visibility

### **API Testing** (Postman/cURL)

```bash
# Health check
curl https://notes-app-production-9996.up.railway.app/actuator/health

# Login
curl -X POST https://notes-app-production-9996.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

---

## 📊 Technical Achievements

- ✅ **Full-Stack Development**: End-to-end implementation from database to UI
- ✅ **RESTful API Design**: Clean, scalable API architecture
- ✅ **Cloud Deployment**: Production-ready deployment on modern platforms
- ✅ **Security Best Practices**: JWT auth, password hashing, CORS, input validation
- ✅ **Database Design**: Normalized schema with proper relationships
- ✅ **Responsive UI**: Mobile-first design with modern CSS
- ✅ **Git Workflow**: Organized commits with meaningful messages
- ✅ **Environment Management**: Separate dev/prod configurations

---

## 🚀 Future Enhancements

- [ ] Email integration for password reset
- [ ] Real-time collaboration with WebSockets
- [ ] Note sharing with other users
- [ ] Rich text editor with formatting
- [ ] File attachments support
- [ ] Mobile app (React Native)
- [ ] Advanced search with Elasticsearch
- [ ] Activity logs and audit trail
- [ ] Two-factor authentication (2FA)
- [ ] Dark mode toggle

---

## 👨‍💻 Developer

**Hissam R**

- 🌐 **Live Demo**: [https://hissam-notes.vercel.app/](https://hissam-notes.vercel.app/)
- 💻 **GitHub**: [@Hissamr](https://github.com/Hissamr)
- 📂 **Repository**: [Notes-app](https://github.com/Hissamr/Notes-app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Spring Boot & Spring Security teams
- React & Vercel teams
- Railway for PaaS hosting
- Open source community

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Built with ❤️ using Spring Boot & React**

[![Live Demo](https://img.shields.io/badge/Try%20It%20Live-success?style=for-the-badge)](https://hissam-notes.vercel.app/)

</div>

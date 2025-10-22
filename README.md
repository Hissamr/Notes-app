# 📝 Notes App

A modern, role-based note-taking web application designed for families, featuring secure authentication and intuitive organization tools.

## 🌟 Features

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

## 🛠️ Technology Stack

### Backend
- **Java 21** - Modern Java features and performance
- **Spring Boot 3.5.6** - Enterprise-grade framework
- **Spring Security 6.x** - Advanced security and authentication
- **Spring Data JPA** - Simplified data access layer
- **JWT Authentication** - Stateless token-based auth
- **H2 Database** - In-memory database for development
- **MySQL Support** - Production-ready database option
- **Maven** - Dependency management and build tool

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **CSS3** - Modern styling with flexbox/grid
- **Context API** - State management for authentication

## 🚀 Quick Start

### Prerequisites
- **Java 21** or higher
- **Node.js 16** or higher
- **npm** or **yarn**
- **Maven 3.6** or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
   ```

2. **Backend Setup**
   ```bash
   cd backend/notesapp
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will start on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/register - Register new user
POST /api/auth/login    - User login
GET  /api/auth/me       - Get current user info
POST /api/auth/link-child - Link child to parent account
```

### Notes Endpoints
```
GET    /api/notes          - Get user's notes
POST   /api/notes          - Create new note
PUT    /api/notes/{id}     - Update note
DELETE /api/notes/{id}     - Delete note
GET    /api/notes/child/{childId} - Get child's notes (parent only)
```

### Folders Endpoints
```
GET    /api/folders        - Get user's folders
POST   /api/folders        - Create new folder
PUT    /api/folders/{id}   - Update folder
DELETE /api/folders/{id}   - Delete folder
```

## 🔧 Configuration

### Database Configuration

**Development (H2)**
```properties
spring.datasource.url=jdbc:h2:file:./data/notesapp
spring.h2.console.enabled=true
```

**Production (MySQL)**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/notesapp
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### JWT Configuration
```properties
app.jwt.secret=your-secret-key-here
app.jwt.expiration=86400000
```

### Environment Variables
Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

## 🗂️ Project Structure

```
notes-app/
├── backend/
│   └── notesapp/
│       ├── src/main/java/com/hissam/notesapp/
│       │   ├── config/          # Configuration classes
│       │   ├── controller/      # REST controllers
│       │   ├── dto/            # Data Transfer Objects
│       │   ├── entity/         # JPA entities
│       │   ├── repository/     # Data repositories
│       │   ├── security/       # Security configuration
│       │   └── service/        # Business logic
│       └── src/main/resources/
│           └── application.properties
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── contexts/          # React contexts
│       ├── pages/             # Page components
│       ├── services/          # API services
│       └── App.js
└── README.md
```

## 🔒 Security Features

- **JWT Token Authentication** - Secure stateless authentication
- **Password Encryption** - BCrypt hashing for password security
- **CORS Configuration** - Proper cross-origin resource sharing
- **Role-Based Authorization** - Endpoint protection based on user roles
- **Input Validation** - Comprehensive validation on all endpoints

## 🌐 Deployment

### Backend Deployment
1. Build the application:
   ```bash
   mvn clean package -DskipTests
   ```
2. Run the JAR file:
   ```bash
   java -jar target/notesapp-0.0.1-SNAPSHOT.jar
   ```

### Frontend Deployment
1. Build for production:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to your web server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hissam** - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- All contributors who helped improve this project

---

⭐ **Star this repository if you found it helpful!** ⭐
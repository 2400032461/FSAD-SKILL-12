# Student Management System — Full-Stack CRUD
**Tech Stack:** React (Frontend) + Spring Boot (Backend)

---

## Project Structure
```
student-management/
├── backend/      → Spring Boot (REST API)
└── frontend/     → React (UI)
```

---

## How to Run

### 1. Backend — Spring Boot
```bash
cd backend
./mvnw spring-boot:run
```
> Runs on **http://localhost:8080**
> H2 Console: http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:studentdb`)

### 2. Frontend — React
```bash
cd frontend
npm install
npm start
```
> Runs on **http://localhost:3000**

---

## REST API Endpoints

| Method | URL                  | Description         |
|--------|----------------------|---------------------|
| GET    | /students            | Get all students    |
| GET    | /students/{id}       | Get student by ID   |
| POST   | /students            | Add new student     |
| PUT    | /students/{id}       | Update student      |
| DELETE | /students/{id}       | Delete student      |

### Sample POST body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "course": "Computer Science"
}
```

---

## Features
- Add students via form (name, email, course)
- View all students in a table
- Update existing student (prefills form)
- Delete student with confirmation
- List auto-refreshes after every operation
- H2 in-memory database (no setup needed)

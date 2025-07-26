# 📡 API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, the API does not require authentication. Student ID is hardcoded to `1` for development.

## Endpoints

### Students

#### Get Student by ID
```http
GET /api/students/{id}
```

Response:
```json
{
  "id": 1,
  "fullName": "Иван Иванович Иванов",
  "email": "ivan@example.com",
  "university": "МГУ",
  "faculty": "ВМК",
  "studentId": "123456789",
  "specialtyCode": "01.03.02",
  "specialty": "Информатика и вычислительная техника",
  "level": "Бакалавриат",
  "course": 2,
  "studyForm": "Очное",
  "financing": "Бюджет",
  "englishLevel": "C1",
  "averageGrade": 4.8
}
```

#### Update Student
```http
PUT /api/students/{id}
```

### Exchange Programs

#### Get All Programs
```http
GET /api/exchange-programs?city=Moscow&language=English&duration=semester
```

#### Get Program by ID
```http
GET /api/exchange-programs/{id}
```

### AI Recommendations

#### Generate Recommendations
```http
POST /api/students/{id}/generate-recommendations
```

Creates new AI-powered course recommendations based on student profile.

#### Get Recommendations
```http
GET /api/students/{id}/recommendations
```

Response:
```json
[
  {
    "id": 1,
    "score": 0.95,
    "reasoning": "This course matches your programming background...",
    "course": {
      "name": "Advanced Machine Learning",
      "code": "CS-ML-501",
      "credits": 6,
      "instructor": "Dr. Smith"
    },
    "program": {
      "name": "Computer Science Exchange",
      "university": {
        "name": "MIT",
        "city": "Boston",
        "rating": 4.9
      }
    }
  }
]
```

### Student Courses

#### Get Student Courses
```http
GET /api/students/{id}/courses
```

#### Add Course
```http
POST /api/students/{id}/courses
```

Body:
```json
{
  "courseName": "Database Systems",
  "courseCode": "CS-DB-301",
  "grade": "5",
  "credits": 4,
  "semester": "spring",
  "year": 2024,
  "description": "Advanced database concepts"
}
```

### Achievements

#### Get Student Achievements
```http
GET /api/students/{id}/achievements
```

#### Add Achievement
```http
POST /api/students/{id}/achievements
```

### Applications

#### Get Student Applications
```http
GET /api/students/{id}/applications
```

#### Create Application
```http
POST /api/students/{id}/applications
```

### Universities

#### Get All Universities
```http
GET /api/universities
```

#### Get University by ID
```http
GET /api/universities/{id}
```

### Development

#### Seed Database
```http
POST /api/seed
```

Populates database with sample data for development.

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Descriptive error message"
}
```

## Rate Limiting
No rate limiting currently implemented for development.

## Data Validation
All POST/PUT requests are validated using Zod schemas defined in `shared/schema.ts`.
# Online Quiz Application - RESTful API

This is a backend API for a basic online quiz application built using **Node.js** and **Express.js**. It handles user authentication, quiz management, and quiz-taking functionalities. The API allows users to register, log in, and participate in multiple-choice quizzes (MCQs) with a single correct answer.

## Features

1. **User Authentication**: Register and login functionality.
2. **MCQ Quiz Management**:
   - Create a new quiz with questions.
   - Retrieve a list of quizzes.
   - Get details of a specific quiz.
   - Submit answers for a quiz and calculate the score.
3. **Quiz Structure**:
   - Each quiz contains multiple questions.
   - Each question has four options and one correct answer.

## Technologies Used

- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB** - Database for storing quizzes and user data
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for user authentication

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js installed.
- MongoDB installed and running locally or use a cloud-based MongoDB service like MongoDB Atlas.
- Postman or any other API testing tool for testing the endpoints.

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/uvaishnasir/Quiz-Application.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd Quiz-Application
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root of the project with the following content:
   ```env
   PORT=8000
   MONGO_URI = your-mongodb-uri-here/db-name
   ACCESS_TOKEN_SECRET = quizAccessSecret
   ACCESS_TOKEN_EXPIRY = 10h
   REFRESH_TOKEN_SECRET= quizRefreshSecret
   REFRESH_TOKEN_EXPIRY = 7d
   ```

5. **Run the server**:
   ```bash
   npm run dev
   ```

   The server will be running on `http://localhost:8000`.

## API Endpoints
( Note- You can import the collection named as `collection-Quiz-App.json` )

### 1. **User Authentication**

#### Register User
```http
POST /api/users/register
```
- **Body**:
  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**: 
  ```json
  {
    "message": "User registered successfully",
    "user": "user-details"
  }
  ```

#### Login User
```http
POST /api/users/login
```
- **Body**:
  ```json
  {
    "email": "testuser@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "JWT token here"
  }
  ```

### 2. **Quiz Management**

#### Create a New Quiz
```http
POST /api/quiz/create
```
- **Body**:
  ```json
  {
    "title": "General Knowledge Quiz",
    "questions": [
      {
        "questionText": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "correctAnswer": 2
      },
      {
        "questionText": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Saturn"],
        "correctAnswer": 1
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Quiz created successfully",
    "quiz": "quiz-here"
  }
  ```

#### Get List of Quizzes
```http
GET /api/quiz/get-all
```
- **Response**:
  ```json
  [
    {
      "_id": "quizId",
      "title": "General Knowledge Quiz",
      "questionsCount": 5
    }
  ]
  ```

#### Get Quiz Details
```http
GET /api/quiz/:id
```
- **Response**:
  ```json
  {
    "_id": "quizId",
    "title": "General Knowledge Quiz",
    "questions": [
      {
        "questionText": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "correctAnswer": 2
      }
    ]
  }
  ```

#### Submit Quiz Answers
```http
POST /api/quiz/:id/submit
```
- **Body** (User's answers):
  ```json
  {
    "answers": [2, 1, 0]
  }
  ```
- **Response** (Score and total number of questions):
  ```json
  {
    "score": 2,
    "total": 3
  }
  ```

## Error Handling

If any error occurs, the API will return a JSON object with an appropriate message and status code:
```json
{
  "message": "Error message here"
}
```

Thanks. Happy Coding!

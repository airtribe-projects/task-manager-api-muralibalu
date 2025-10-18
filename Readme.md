Task Manager API
Overview

This project is a simple RESTful API built using Node.js and Express.js to manage tasks.
It allows users to create, read, update, and delete (CRUD) tasks stored in-memory.
The API includes input validation and error handling for robust functionality.

Setup Instructions

Clone the repository:

git clone <your-repo-url>
cd task-manager


Install dependencies:

npm install


Start the server:

node app.js


Or if using nodemon:

npx nodemon app.js


Server runs on:

http://localhost:3000

API Endpoints
1. Get All Tasks

URL: /tasks

Method: GET

Description: Retrieve a list of all tasks.

Response Example:

[
  {
    "id": 1,
    "title": "Learn Node.js",
    "description": "Understand basics of Node.js",
    "completed": false
  }
]

2. Get Task by ID

URL: /tasks/:id

Method: GET

Description: Retrieve a task by its ID.

Response Example (200 OK):

{
  "id": 1,
  "title": "Learn Node.js",
  "description": "Understand basics of Node.js",
  "completed": false
}


Error (404 Not Found):

{ "error": "Task not found" }

3. Create a New Task

URL: /tasks

Method: POST

Description: Create a new task.

Body Example (JSON):

{
  "title": "Create a project",
  "description": "Build a REST API",
  "completed": false
}


Response (201 Created):

{
  "id": 2,
  "title": "Create a project",
  "description": "Build a REST API",
  "completed": false
}


Error (400 Bad Request, invalid input):

{
  "errors": [
    { "msg": "Title is required", "param": "title", "location": "body" }
  ]
}

4. Update a Task

URL: /tasks/:id

Method: PUT

Description: Update an existing task.

Body Example (JSON):

{
  "title": "Update project",
  "description": "Build REST API with Express",
  "completed": true
}


Response Example (200 OK):

{
  "id": 2,
  "title": "Update project",
  "description": "Build REST API with Express",
  "completed": true
}


Error (400 Bad Request, invalid input) or 404 Not Found if task doesn't exist.

5. Delete a Task

URL: /tasks/:id

Method: DELETE

Description: Delete a task by ID.

Response: 204 No Content if successful

Error (404 Not Found):

{ "error": "Task not found" }

Testing the API

You can test the API using:

Postman:

Import the endpoints and send requests with JSON body for POST and PUT.

Curl:

# Get all tasks
curl http://localhost:3000/tasks

# Get task by ID
curl http://localhost:3000/tasks/1

# Create new task
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" \
-d '{"title":"New Task","description":"Testing","completed":false}'

# Update task
curl -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" \
-d '{"title":"Updated Task","description":"Updated","completed":true}'

# Delete task
curl -X DELETE http://localhost:3000/tasks/1
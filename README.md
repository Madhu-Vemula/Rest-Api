# Simple REST API for Task Management

This is a simple RESTful API built with Node.js and Express.js to manage tasks. It supports CRUD operations (Create, Read, Update, Delete) for tasks stored in an in-memory array. The API returns JSON responses and uses proper HTTP status codes.

## Endpoints:
- **POST /tasks**: Create a new task (requires `title` and `description`).
- **GET /tasks**: Retrieve all tasks.
- **GET /tasks/:id**: Retrieve a single task by ID.
- **PUT /tasks/:id**: Update a task by ID.
- **DELETE /tasks/:id**: Delete a task by ID.

Deployed URL: https://madhu-vemula.github.io/Rest-Api/

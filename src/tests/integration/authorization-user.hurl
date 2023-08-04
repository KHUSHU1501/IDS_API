# Authorization header with valid JWT token allows user to access restricted routes

#Login
POST http://localhost:8080/api/login
Content-Type: application/json
{"userName" : "{{userName}}", "password" : "{{password}}"}

# We expect to get back an HTTP 200
HTTP/1.1 200
[Captures]
token: jsonpath "$.token"

# Get a list of all current tasks
GET http://localhost:8080/api/tasks
Authorization: JWT {{token}}

# We expect to get back an HTTP 200
HTTP/1.1 200
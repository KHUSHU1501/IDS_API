# Error : Attempting to get a task with invalid id

#Login
POST http://localhost:8080/api/login
Content-Type: application/json
{"userName" : "{{userName}}", "password" : "{{password}}"}

# We expect to get back an HTTP 200
HTTP/1.1 200
[Captures]
token: jsonpath "$.token"

# Attempt to get task by id with a invalid id
GET http://localhost:8080/api/tasks/randomid123
Authorization: JWT {{token}}

# We expect to get back an HTTP 500 due to the invalid id provided
HTTP/1.1 500
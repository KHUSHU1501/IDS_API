# Delete Error when invalid task id is provided 

#Login
POST http://localhost:8080/api/login
Content-Type: application/json
{"userName" : "{{userName}}", "password" : "{{password}}"}

# We expect to get back an HTTP 200
HTTP/1.1 200
[Captures]
token: jsonpath "$.token"

# Delete a task with a invalid id
DELETE http://localhost:8080/api/tasks/randomid1234121212
Authorization: JWT {{token}}

# We expect to get back an HTTP 500 due to invalid id
HTTP/1.1 500
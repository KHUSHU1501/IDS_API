#Login with valid credentials using a post route
POST http://localhost:8080/api/login
Content-Type: application/json
{"userName" : "{{userName}}", "password" : "{{password}}"}

# We expect to get back an HTTP 200
HTTP/1.1 200
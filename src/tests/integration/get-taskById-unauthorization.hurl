# Attempt to get task created above by it's id without JWT authorization error
GET http://localhost:8080/api/tasks/12345

# We expect to get back an HTTP 401
HTTP/1.1 401
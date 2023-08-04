#Attempt to get tasks without JWT authorization error
GET http://localhost:8080/api/tasks

# We expect to get back an HTTP 401
HTTP/1.1 401
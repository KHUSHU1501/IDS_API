# 401 Authorization Error Test when no Authorization Token is present during a request
GET http://localhost:8080/api/tasks

# We expect to get back an HTTP 401
HTTP/1.1 401

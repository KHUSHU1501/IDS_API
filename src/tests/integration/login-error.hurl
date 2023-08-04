#Login 500 Error when Invalid Credentials are provided for login

#Attempt to Login with Invalid Credentials 
POST http://localhost:8080/api/login
Content-Type: application/json
{"userName" : "RandomUserName", "password" : "RandomPassword12345"}

# We expect to get back an HTTP 500
HTTP/1.1 500
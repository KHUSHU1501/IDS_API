#Post-Tasks.hurl
#Login
POST http://localhost:8080/api/login
Content-Type: application/json
{"userName" : "{{userName}}", "password" : "{{password}}"}

# We expect to get back an HTTP 200
HTTP/1.1 200
[Captures]
token: jsonpath "$.token"

# POST Task 
POST http://localhost:8080/api/tasks
Authorization: JWT {{token}}
# We're sending a application/json fragment
Content-Type: application/json
# Body of the request
{
  "type": "Transport",
  "requestor": "123456",
  "patient": "Testing Data3",
  "location": "xray",
  "destination": "3f-xyz",
  "isolation": false,
  "notes": [
    "X-Ray Scan",
    "Possible sprain in left leg"
  ],
  "status": "notAssigned",
  "transporter": ""
}

# We expect to get back an HTTP 201
HTTP/1.1 201

# Capture Id of Task Created
[Captures]
task_id: jsonpath "$._id"

# Delete the temp testing task
DELETE http://localhost:8080/api/tasks/{{task_id}}
Authorization: JWT {{token}}

# We expect to get back an HTTP 201 after the task is deleted
HTTP/1.1 201
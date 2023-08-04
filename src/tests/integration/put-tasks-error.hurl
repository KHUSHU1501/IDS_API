#Capture Error when updating a task
#Login
POST http://localhost:8080/api/login
Content-Type: application/json
{"userName" : "{{userName}}", "password" : "{{password}}"}

# We expect to get back an HTTP 200
HTTP/1.1 200
[Captures]
token: jsonpath "$.token"

#Attempt to update a task that does not exist
PUT http://localhost:8080/api/tasks/12345
Authorization: JWT {{token}}
# We're sending a application/json fragment
Content-Type: application/json
# Body of the request
{
  "type": "Isolation",
  "requestor": "123456",
  "patient": "Patient 2",
  "location": "Covid Section",
  "destination": "4f-xyz",
  "isolation": true,
  "notes": [
    "X-Ray Scan",
    "Possible sprain in left leg",
    "Postive Covid Status"
  ],
  "status": "notAssigned",
  "transporter": ""
}

# We expect to get back an HTTP 500
HTTP/1.1 500
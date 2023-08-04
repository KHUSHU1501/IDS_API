#Attempt to update a task without a JWT authorization error
PUT http://localhost:8080/api/tasks/12345

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

# We expect to get back an HTTP 401
HTTP/1.1 401
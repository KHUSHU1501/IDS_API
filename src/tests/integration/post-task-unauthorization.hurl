#Post a task without JWT error

# POST Task 
POST http://localhost:8080/api/tasks
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

# We expect to get back an HTTP 401
HTTP/1.1 401
# Update a Task (PUT)

#Login
POST http://localhost:8080/api/login
Content-Type: application/json
{"userName" : "{{userName}}", "password" : "{{password}}"}

# We expect to get back an HTTP 200
HTTP/1.1 200
[Captures]
token: jsonpath "$.token"

#Create a task to update 
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

#Create a task to update 
PUT http://localhost:8080/api/tasks/{{task_id}}
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

# We expect to get back an HTTP 200
HTTP/1.1 200

[Asserts]
jsonpath "$.message" == "Task Updated!"

# Attempt to get task created above by it's id
GET http://localhost:8080/api/tasks/{{task_id}}
Authorization: JWT {{token}}

# We expect to get back an HTTP 200
HTTP/1.1 200

# Confirm the task recieved matches the data given to create the task
[Asserts]
jsonpath "$.type" == "Isolation"
jsonpath "$.requestor" == "123456"
jsonpath "$.patient" == "Patient 2"
jsonpath "$.location" == "Covid Section"
jsonpath "$.destination" == "4f-xyz"
jsonpath "$.isolation" == true
jsonpath "$.notes" includes "X-Ray Scan"
jsonpath "$.notes" includes "Possible sprain in left leg"
jsonpath "$.notes" includes "Postive Covid Status"
jsonpath "$.status" == "notAssigned"
jsonpath "$.__v" == 1

# Delete the temp testing task created above
DELETE http://localhost:8080/api/tasks/{{task_id}}
Authorization: JWT {{token}}

# We expect to get back an HTTP 201 after the task is deleted
HTTP/1.1 201
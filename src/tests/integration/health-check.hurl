#Health Check Test
GET http://localhost:8080

# We should get back an HTTP 1.1 200 ressponse
HTTP/1.1 200

# Extra checks to perform against the response
[Asserts]
# We expect to get back a JSON response with { "status": "ok", ... }
jsonpath "$.status" == "ok"
# We expect to get back a JSON response with { ..., "author": "..." }
jsonpath "$.author" == "SeneCoders"
# We expect to get back a JSON response with { ..., "description": "..." }
jsonpath "$.description" == "Internal Dispatch System API"
# We expect to get back a JSON response with { ..., "version": "x.y.z" }
jsonpath "$.version" matches /^\d+\.\d+\.\d+$/
# We expect to get back a JSON response with { ..., "message", ...}
jsonpath "$.message" == "API Listening!"
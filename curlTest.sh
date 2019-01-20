echo "POST"
curl -d "name=john smith" -d "phone=0000000000" -d "email=john@john.john" \
localhost:8080/contact
echo
echo "GET /contact/{name}"
curl http://localhost:8080/contact/john
echo "GET all contacts"
curl -G http://localhost:8080/contact -d pageSize=10 -d page=1 -d query=hello
echo
echo "PUT contact"
curl -X PUT localhost:8080/contact/john
echo "DELETE contact"
curl -X DELETE localhost:8080/contact/john
echo


echo $'\n\n[requesting]:all invalid  request]'
curl -i localhost:3000 -X POST --data '{"name":"v", "age":"10"}'

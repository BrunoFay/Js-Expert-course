echo $'\n\n[requesting]:normal request]'
curl -i localhost:3000 -X POST --data '{"name":"vingador", "age":"80"}' #correct

echo $'\n\n[requesting]:wrong age request]'
curl -i localhost:3000 -X POST --data '{"name":"vingador", "age":"10"}'


echo $'\n\n[requesting]:wrong name request]'
curl -i localhost:3000 -X POST --data '{"name":"v", "age":"80"}'

echo $'\n\n[requesting]:connection error]'
curl -i localhost:3000 -X POST --data '{"connectionError":"true"}'


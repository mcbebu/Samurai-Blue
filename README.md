# Samurai-Blue

docker buildx build --platform linux/amd64 -t backend-ml:v2 .
docker tag backend-ml:v2 swr.ap-southeast-3.myhuaweicloud.com/ninjavan-samuraiblue/backend-ml:v2
docker push swr.ap-southeast-3.myhuaweicloud.com/ninjavan-samuraiblue/backend-ml:v2
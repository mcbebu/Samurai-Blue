# Samurai-Blue

docker buildx build --platform linux/amd64 -t samurai-blue-backend:v7 .
docker tag samurai-blue-backend:v7 swr.ap-southeast-3.myhuaweicloud.com/ninjavan-samuraiblue/samurai-blue-backend:v7
docker push swr.ap-southeast-3.myhuaweicloud.com/ninjavan-samuraiblue/samurai-blue-backend:v7
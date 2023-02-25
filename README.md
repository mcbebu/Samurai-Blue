# Samurai-Blue

docker buildx build --platform linux/amd64 -t backend-twitch .
docker tag backend-twitch swr.ap-southeast-3.myhuaweicloud.com/ninjavan-samuraiblue/backend-twitch
docker push swr.ap-southeast-3.myhuaweicloud.com/ninjavan-samuraiblue/backend-twitch
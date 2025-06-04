#!/bin/bash
cd /home/ubuntu/app

FE_IMAGE_LATEST=$(jq -r .frontendImage imageDetail.json)

usermod -aG docker ubuntu
echo "Pulling FE image: $FE_IMAGE_LATEST"
docker pull $FE_IMAGE_LATEST
docker stop frontend || true
docker rm frontend || true

docker run -d \
  --name frontend \
  -p 3000:3000 \
  --restart always \
  --env NEXT_PUBLIC_API_URL=https://kakaobase.com/api \
  --env NODE_ENV=production \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  $FE_IMAGE_LATEST
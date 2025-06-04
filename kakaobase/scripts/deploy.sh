#!/bin/bash
cd /home/ubuntu/app

FE_IMAGE_LATEST=$(jq -r .frontendImage imageDetail.json)

sudo usermod -aG docker ubuntu
newgrp docker

echo "Pulling FE image: $FE_IMAGE_LATEST"
sudo docker pull $FE_IMAGE_LATEST
sudo docker stop frontend || true
sudo docker rm frontend || true

sudo docker run -d \
  --name frontend \
  -p 80:3000 \
  --restart always \
  --env NEXT_PUBLIC_API_URL=https://kakaobase.com/api \
  --env NODE_ENV=production \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  $FE_IMAGE_LATEST
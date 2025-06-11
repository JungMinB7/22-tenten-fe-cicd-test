#!/bin/bash
set -e

cd /home/ubuntu/app

# 🔐 ECR 로그인 (IAM Role 기반 권한 필요)
echo "Logging into ECR..."
ECR_REPO=$(jq -r .ecrRepo imageDetail.json)
AWS_REGION=$(jq -r .awsRegion imageDetail.json)
aws ecr get-login-password --region "$AWS_REGION" | \
  sudo docker login --username AWS --password-stdin "$ECR_REPO"
  
# 📦 이미지 정보 읽기
FE_IMAGE_LATEST=$(jq -r .frontendImage imageDetail.json)
echo "Pulling FE image: $FE_IMAGE_LATEST"

# 💡 기존 컨테이너 정리
sudo docker stop frontend || true
sudo docker rm frontend || true

# 🚀 새 컨테이너 실행
sudo docker run -d \
  --name frontend \
  -p 3000:3000 \
  --restart always \
  --env NEXT_PUBLIC_API_URL=https://kakaobase.com/api \
  --env NODE_ENV=production \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  "$FE_IMAGE_LATEST"

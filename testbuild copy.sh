#!/bin/bash
echo "\n\n🔵🐦🔵🐦🔵🐦 Deploying KasieTransie on NestJS 🔵🐦🔵🐦🔵🐦"
# Define variables
PROJECT_ID="thermal-effort-366015"
IMAGE_NAME="kasie-nest"
REGION="europe-west1"
SERVICE_NAME="kasie-nestjs"

# Build the Docker image
docker build -t kasie-nest .

# Push the Docker image to GCR
# docker push gcr.io/$PROJECT_ID/$IMAGE_NAME
# echo "🍎🍎🍎🍎🍎🍎🍎🍎🍎 start deployment to Cloud Run"
# # Deploy the app to Cloud Run
# gcloud run deploy $SERVICE_NAME \
#   --image gcr.io/$PROJECT_ID/$IMAGE_NAME \
#   --platform managed \
#   --region $REGION \
#   --allow-unauthenticated

echo "🍎🍎🍎🍎🍎🍎🍎🍎🍎 Hopefully, we have built successfully\n"
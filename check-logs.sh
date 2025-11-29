#!/bin/bash
SERVICE_NAME="khair-backend-autodeploy"
REGION="europe-west1"
gcloud run services logs read $SERVICE_NAME --region $REGION --limit 50

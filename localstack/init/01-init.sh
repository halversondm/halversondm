#!/bin/sh
set -e

awslocal dynamodb create-table \
  --table-name ABC \
  --attribute-definitions AttributeName=when,AttributeType=S \
  --key-schema AttributeName=when,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

awslocal secretsmanager create-secret \
  --name prod/halversondm \
  --secret-string '{"polygonApiKey":"local-dev-key","googleApiKey":"local-dev-key"}'

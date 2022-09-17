# inbound parse receive

Receive webhook from sendgrid

## deploy

    gcloud functions deploy webhook-receive --gen2 --runtime=nodejs16 \
        --region=asia-northeast1 --entry-point=handler \
        --trigger-http --allow-unauthenticated

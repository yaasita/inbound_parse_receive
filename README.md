# inbound parse receive

Receive webhook from sendgrid

## deploy

    gcloud functions deploy webhook-receive --runtime nodejs10 \
        --entry-point handler --region asia-northeast1 \
        --trigger-http --allow-unauthenticated 

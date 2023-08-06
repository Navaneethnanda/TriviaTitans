import boto3
import json
import http.client

def lambda_handler(event, context):
    sns = boto3.client("sns")
    game_name = event["GameName"]
    conn = http.client.HTTPSConnection("r66ypo4nf8.execute-api.us-east-1.amazonaws.com")
    conn.request("GET", "/test")
    res = conn.getresponse()
    users_raw = res.read().decode("utf-8")
    users = json.loads(users_raw)
    
    message = {
        "GameName": game_name,
        "Users": users
    }
    
    sns.publish(
        TopicArn = "arn:aws:sns:us-east-1:981263172079:NewGameTopic",
        Message = json.dumps(message)
    )
    
    response = {
        "status": "success",
        "message": "Alert for new game sent!"
    }
    
    return response
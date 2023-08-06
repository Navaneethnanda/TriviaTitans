import boto3
import json
import random

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    if "username" not in event:
        response = {
            'statusCode': 404, 
            "data": "username required error" 
        }
        return response

    num = random.randint(1, 3)
    data = client.get_item(
        TableName='userSecurityQuestions',
        Key={
            'username': {
                'S': event["username"]
            }
        }
    )
    headers = {}

    role = "admin"  # Default role is admin
    if "Item" in data:
        if "role" in data["Item"]:
            role = data["Item"]["role"]["S"]

    response = {
        'statusCode': 200,
        "headers": headers,
        "Question": data["Item"]["securityQuestion" + str(num)]['S'],
        "answer": data["Item"]["answer" + str(num)]['S'],
        "role": role
    }

    return response


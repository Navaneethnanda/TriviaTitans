import boto3
import json
import random

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    
    
    
   
    item={
            "username": {
              "S": event["username"]
            },
            "securityQuestion1": {
              "S": event["securityQuestion1"]
            },
            "securityQuestion2": {
              "S": event["securityQuestion2"]
            },
            "securityQuestion3": {
              "S": event["securityQuestion3"]
            },
            "answer1": {
              "S": event["answer1"]
            },
            "answer2": {
              "S": event["answer2"]
            },
            "answer3": {
              "S": event["answer3"]
            },
            
            "role": {
              "S": "user"
            }
        }
          
    data = client.put_item(TableName='userSecurityQuestions',
              Item=item)
        
    response = {
        'statusCode': 200,
        "data":"data set as expected"
    }

    return response


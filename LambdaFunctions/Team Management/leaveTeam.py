import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TeamsUsers')
sns = boto3.client('sns')

def lambda_handler(event, context):
    user_email = event['UserEmail']
    team_name = event['TeamName']

    table.delete_item(
        Key={
            'TeamName': team_name,
            'UserEmail': user_email
        }
    )
    
    message = {
        "TeamName": team_name
    }
    
    sns.publish(
        TopicArn = "arn:aws:sns:us-east-1:981263172079:TeamUpdateTopic",
        Message = json.dumps(message)
        )
    
    response = {
        "status": "success",
        "message": "You left the team!"
    }
    
    
    return response

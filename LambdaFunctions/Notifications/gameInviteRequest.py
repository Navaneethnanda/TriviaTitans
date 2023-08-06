import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('TeamsUsers')
    sns = boto3.client('sns')
    
    team_name = event["TeamName"]
    game_name = event["GameName"]
    inviter = event["Inviter"]
    
    response = table.query(
        KeyConditionExpression='TeamName = :team_name',
        ExpressionAttributeValues={
            ':team_name': team_name
        }
    )
    
    users = []
    for item in response['Items']:
        if (item['UserEmail'] != inviter):
            users.append(item['UserEmail'])
    
    message = {
        "TeamName": team_name,
        "GameName": game_name,
        "Users": users 
    }
    
    sns.publish(
        TopicArn = "arn:aws:sns:us-east-1:981263172079:GameInviteTopic",
        Message = json.dumps(message)
        )
    
    response = {
        "status": "success",
        "message": "Game Invite Email Sent!"
    }
    
    return response
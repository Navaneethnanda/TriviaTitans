import boto3
import json

sns = boto3.client('sns')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TeamsUsers')

def lambda_handler(event, context):
    team_name = event['TeamName']
    inviter = event['Inviter']
    invitee = event['Invitee']
    
    accept_message = {
        "TeamName": team_name,
        "Inviter": inviter,
        "Invitee": invitee
    }
    
    table.put_item(
        Item={
            'TeamName': team_name,
            'UserEmail': invitee,
            'UserRole': 'Player'
        }
    )
    
    sns.publish(
        TopicArn = "arn:aws:sns:us-east-1:981263172079:TeamUpdateTopic",
        Message = json.dumps(accept_message)
        )
    
    sns.publish(
        TopicArn = "arn:aws:sns:us-east-1:981263172079:AcceptTeamInviteTopic",
        Message = json.dumps(accept_message)
        )
    
    response = {
        "status": "success",
        "message": "Accept Email Sent!"
    }
    
    return response
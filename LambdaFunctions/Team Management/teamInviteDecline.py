import boto3
import json

sns = boto3.client('sns')

def lambda_handler(event, context):
    team_name = event['TeamName']
    inviter = event['Inviter']
    invitee = event['Invitee']
    
    accept_message = {
        "TeamName": team_name,
        "Inviter": inviter,
        "Invitee": invitee
    }
    
    sns.publish(
        TopicArn = "arn:aws:sns:us-east-1:981263172079:DeclineTeamInviteTopic",
        Message = json.dumps(accept_message)
        )
    
    response = {
        "status": "success",
        "message": "Decline Email Sent!"
    }
    
    return response
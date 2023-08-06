import boto3
import json

sqs_client = boto3.client('sqs')
ses_client = boto3.client('ses')

queue_url = "https://sqs.us-east-1.amazonaws.com/981263172079/AcceptTeamInviteQueue"
def lambda_handler(event, context):
    response = sqs_client.receive_message(
        QueueUrl = queue_url,
        MaxNumberOfMessages = 1,
        MessageAttributeNames=['All']
    )
    
    if 'Messages' in response:
        sqs_message_body = json.loads(response['Messages'][0]['Body'])
        required_json = json.loads(sqs_message_body['Message'])
        team_name = required_json['TeamName']
        inviter = required_json['Inviter']
        invitee = required_json['Invitee']
        
        receipt_handle = response['Messages'][0]['ReceiptHandle']
        
        email_subject = "Team Invite Accepted!"
        email_body = f"{invitee} has accepted your invite to team {team_name}!"
        
        ses_client.send_email(
            Source='TriviaTitansG7@proton.me',
            Destination={
                'ToAddresses': [inviter]
            },
            Message={
                'Subject': {'Data': email_subject},
                'Body': {'Text': {'Data': email_body}}
            }
        )

        sqs_client.delete_message(
            QueueUrl=queue_url,
            ReceiptHandle=receipt_handle
        )
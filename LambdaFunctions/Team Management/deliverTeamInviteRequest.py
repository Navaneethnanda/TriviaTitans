import boto3
import json
import urllib.parse

sqs_client = boto3.client('sqs')
ses_client = boto3.client('ses')

queue_url = "https://sqs.us-east-1.amazonaws.com/981263172079/TeamInviteQueue"
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
            
        inviter_encoded = urllib.parse.quote(inviter)
        invite_url = f"localhost:3000/invitation/{team_name}/{inviter_encoded}"
            
        email_subject = "You have been invited to a team!"
        email_body = f"{inviter} has invited you to join team {team_name}! Please copy and paste the link in your browser to respond. {invite_url}"
        
        print(email_body)
            
        ses_client.send_email(
            Source='TriviaTitansG7@proton.me',
            Destination={
                'ToAddresses': [invitee]
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
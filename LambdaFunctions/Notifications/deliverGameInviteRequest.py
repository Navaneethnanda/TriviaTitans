import boto3
import json

sqs_client = boto3.client('sqs')
ses_client = boto3.client('ses')

queue_url = "https://sqs.us-east-1.amazonaws.com/981263172079/GameInviteQueue"
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
        game_name = required_json['GameName']
        users = required_json['Users']
            
        receipt_handle = response['Messages'][0]['ReceiptHandle']
            
        email_subject = "You have been requested to join a game!"
        email_body = f"You have been invited to join a trivia game with team {team_name}! Please search for game '{game_name}' and "
        
        print(email_body)
            
        ses_client.send_email(
            Source='TriviaTitansG7@proton.me',
            Destination={
                'ToAddresses': users
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
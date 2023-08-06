import boto3
import json

sqs_client = boto3.client('sqs')
ses_client = boto3.client('ses')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TeamsUsers')

queue_url = "https://sqs.us-east-1.amazonaws.com/981263172079/TeamUpdateQueue"
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
            
        receipt_handle = response['Messages'][0]['ReceiptHandle']
        
        response = table.query(
            KeyConditionExpression='TeamName = :team_name',
            ExpressionAttributeValues={
                ':team_name': team_name
            }
        )
    
        users = []
        for item in response['Items']:
            users.append(item['UserEmail'])
            
        email_subject = "Your Team has been updated!"
        email_body = f"Your team {team_name} has been updated. Please visit your team page to see changes."
            
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
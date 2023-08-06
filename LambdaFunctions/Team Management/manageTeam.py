import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TeamsUsers')
sns = boto3.client('sns')

def lambda_handler(event, context):
    team_name = event['TeamName']
    user_roles = event['UserRoles']

    for user_role in user_roles:
        user_email = user_role['UserEmail']
        role = user_role['UserRole']

        if role == 'Removed':
            table.delete_item(
                Key={
                    'TeamName': team_name,
                    'UserEmail': user_email
                }
            )
        else:
            table.update_item(
                Key={
                    'TeamName': team_name,
                    'UserEmail': user_email
                },
                UpdateExpression='SET UserRole = :val',
                ExpressionAttributeValues={
                    ':val': role
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
        "message": "Team has been updated!"
    }
    
    return response

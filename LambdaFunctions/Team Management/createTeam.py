import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TeamsUsers')

def lambda_handler(event, context):
    team_name = event['TeamName']
    member_email = event['UserEmail']
    member_role = event['UserRole']

    table.put_item(
        Item={
            'TeamName': team_name,
            'UserEmail': member_email,
            'UserRole': member_role
        }
    )

    response = {
        "status": "success",
        "message": "Team Created!"
    }
    
    return response

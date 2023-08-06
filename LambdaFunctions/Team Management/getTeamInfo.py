import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TeamsUsers')

def lambda_handler(event, context):
    team_name = event['TeamName']
    
    response = table.query(
        KeyConditionExpression='TeamName = :team_name',
        ExpressionAttributeValues={
            ':team_name': team_name
        }
    )
    
    members = []
    for item in response['Items']:
        members.append(item)
    
    return {
        'Data': members
    }

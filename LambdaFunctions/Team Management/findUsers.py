import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('TeamsUsers')
    
    team_name = event['TeamName']
    
    response = table.query(
        KeyConditionExpression='TeamName = :team_name',
        ExpressionAttributeValues={
            ':team_name': team_name
        }
    )
    
    users = []
    for item in response['Items']:
        users.append(item['UserEmail'])
    
    return {
        "TeamName": team_name,
        "Users": users
    }

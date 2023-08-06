import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('TeamsUsers')
    
    user_email = event['UserEmail']
    
    response = table.scan(
        FilterExpression='UserEmail = :user_email',
        ExpressionAttributeValues={ ':user_email': user_email })
    
    teams = []
    for item in response['Items']:
        teams.append(item['TeamName'])
    
    return {
        "UserEmail": user_email,
        "Teams": teams
    }

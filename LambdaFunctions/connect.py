import boto3
import json
 
 
dynamodb = boto3.resource('dynamodb')
table_name = 'chatInfo'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    print(event)
    connection_id = event['requestContext']['connectionId']
    room_id=""
    if event.get('queryStringParameters'):
        room_id = event['queryStringParameters'].get('roomId')
    else:
        return {'statusCode': 502}
    print(room_id)
     
    response = table.update_item(
        Key={'roomId': room_id},
        UpdateExpression='ADD connected_clients :client',
        ExpressionAttributeValues={':client': {connection_id}},
    )

  

    return {
        'statusCode': 200
    }

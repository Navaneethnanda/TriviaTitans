import boto3
import json

dynamodb = boto3.resource('dynamodb')
table_name = 'chatInfo'
table = dynamodb.Table(table_name)

def send_message_to_clients(room_id, message):
    # Get the list of connected clients for the room from DynamoDB
    response = table.get_item(Key={'roomId': room_id})
    item = response.get('Item')
    connected_clients = item.get('connected_clients', set())
    print(connected_clients)

    # Send the message to all connected clients in the room
    apigw_management = boto3.client('apigatewaymanagementapi', endpoint_url='https://g6vyqz78f1.execute-api.us-east-1.amazonaws.com/dev')
    for connection_id in connected_clients:
        apigw_management.post_to_connection(ConnectionId=connection_id, Data=json.dumps(message))

def lambda_handler(event, context):
    
    body = json.loads(event['body'])
    room_id = body.get('roomId')
    message = body.get('message')
    user=body.get("user")
    print(room_id,message) 
    if not room_id or not message:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'roomId and message are required in the request body.'})
        }

    send_message_to_clients(room_id, {'action': 'message', 'content': message,"user":user})

    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Message sent successfully.'})
    }




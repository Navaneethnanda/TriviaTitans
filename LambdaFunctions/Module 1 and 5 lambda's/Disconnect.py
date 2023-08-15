import boto3
import json

dynamodb = boto3.resource('dynamodb')
table_name = 'chatInfo'
table = dynamodb.Table(table_name)

def get_room_id_from_connection(connection_id):
    # Scan the DynamoDB table to find the room containing the given connection_id
    response = table.scan(
        FilterExpression='contains(connected_clients, :connection)',
        ExpressionAttributeValues={':connection': connection_id},
    )

    # Get the roomId of the room containing the connection_id
    if 'Items' in response:
        items = response['Items']
        if items:
            return items[0]['roomId']

    return None



def lambda_handler(event, context):
    connection_id = event['requestContext']['connectionId']

    # Get the roomId for the disconnected client using the connectionId
    room_id = get_room_id_from_connection(connection_id)

    if not room_id:
        # Room not found for the disconnected client, return a response
        return {
            'statusCode': 404
        }

    # Remove the disconnected client's connection ID from the `connected_clients` set
    response = table.update_item(
        Key={'roomId': room_id},
        UpdateExpression='DELETE connected_clients :client',
        ExpressionAttributeValues={':client': {connection_id}},
    )



    return {
        'statusCode': 200
    }


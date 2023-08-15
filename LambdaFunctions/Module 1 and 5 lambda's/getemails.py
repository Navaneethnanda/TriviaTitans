import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'userSecurityQuestions'
primary_key_column_name = 'username'  # Replace with your actual primary key column name

def lambda_handler(event, context):
    try:
        table = dynamodb.Table(table_name)

        # Execute the scan operation
        response = table.scan(ProjectionExpression=primary_key_column_name)

        # Extract primary keys from the response
        primary_keys = [item[primary_key_column_name] for item in response['Items']]

        return primary_keys

    except Exception as e:
        print('Error:', e)
        raise e

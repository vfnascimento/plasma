import json
import boto3


def lambda_handler(event, context):
    # Parse the input JSON
    data = json.loads(event['body'])
    
    # Extract the CPF to use as filename
    cpf = data['cpf']
    
    # Create the S3 client
    s3 = boto3.client('s3')
    
    # Define the bucket and file path
    bucket_name = 'mh-cleaning'
    file_path = f'user_data/{cpf}.json'
    
    # Save the data to S3
    s3.put_object(Bucket=bucket_name, Key=file_path, Body=json.dumps(data))
    
    # Return a success response
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Cadastro efetuado com sucesso'})
    }

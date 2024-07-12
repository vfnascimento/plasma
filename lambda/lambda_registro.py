import json
import boto3

def lambda_handler(event, context):
    # Parse the input JSON
    try:
        data = json.loads(event['body'])
    except (json.JSONDecodeError, KeyError) as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid input', 'error': str(e)})
        }

    # Extract required fields
    chat_id = data.get('chat_id')
    nome = data.get('nome')
    sobrenome = data.get('sobrenome')
    cpf = data.get('cpf')
    telefone = data.get('telefone')
    email = data.get('email')

    # Validate required fields
    if not all([nome, sobrenome, cpf, telefone, email]):
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'All fields are required: nome, sobrenome, cpf, telefone, email'})
        }

    # Create the S3 client
    s3 = boto3.client('s3')
    
    # Define the bucket and file path
    bucket_name = 'mh-cleaning'
    file_path = f'user_data/{cpf}.json'
    
    # Prepare data to save
    user_data = {
        'chat_id': chat_id,
        'nome': nome,
        'sobrenome': sobrenome,
        'cpf': cpf,
        'telefone': telefone,
        'email': email
    }
    
    # Save the data to S3
    try:
        s3.put_object(Bucket=bucket_name, Key=file_path, Body=json.dumps(user_data))
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error saving data', 'error': str(e)})
        }
    
    # Return a success response
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Cadastro efetuado com sucesso'})
    }

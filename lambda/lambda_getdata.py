import json
import boto3
import telebot
from boto3.dynamodb.conditions import Key

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
bucket_name = 'mh-cleaning'
table_name = 'mh-cleaning'
bot_token = 'SEU_BOT_TOKEN'
bot = telebot.TeleBot(bot_token)

def lambda_handler(event, context):
    try:
        params = event['queryStringParameters']
        cpf = params['cpf']
        
        # Obter o arquivo JSON do S3
        key = f'user_data/{cpf}.json'
        response = s3.get_object(Bucket=bucket_name, Key=key)
        user_data = json.loads(response['Body'].read())
        
        chat_id = user_data['chat_id']
        
        # Consultar o status da assinatura no DynamoDB
        table = dynamodb.Table(table_name)
        response = table.query(
            KeyConditionExpression=Key('chat_id').eq(chat_id)
        )
        items = response['Items']
        subscriptionStatus = items[0]['status'] if items else 0

        return {
            'statusCode': 200,
            'body': json.dumps({
                'user': user_data,
                'subscriptionStatus': subscriptionStatus
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }

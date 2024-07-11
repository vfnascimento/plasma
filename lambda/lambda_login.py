import json
import boto3
import random
import telebot

s3 = boto3.client('s3')
bucket_name = 'mh-cleaning'
bot_token = '7448336234:AAFYG24XDiM-wa3YDwhw1RKdd0EBhp19gJE'
bot = telebot.TeleBot(bot_token)

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        cpf = body['cpf']
        code = body['code']
        
        # Obter o arquivo JSON do S3
        key = f'user_data/{cpf}.json'
        response = s3.get_object(Bucket=bucket_name, Key=key)
        user_data = json.loads(response['Body'].read())
        
        chat_id = user_data['chat_id']
        
        # Enviar o código via Telegram
        message = f"Seu código de login é: {code}"
        bot.send_message(chat_id, message)
        
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Código enviado com sucesso'})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }

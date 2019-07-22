import json
import random
import string
import boto3
import mimetypes
from chalice import Chalice

app = Chalice(app_name='image-api')
s3_client = boto3.client('s3', region_name='us-east-1')

def randomString(stringLength=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))

@app.route('/', methods=['POST'], cors=True)
def get_presigned_url():
    file_spec = app.current_request.json_body
    name = randomString(3) + '.' + file_spec['name'].split('.')[1]
    return {'url': s3_client.generate_presigned_url(ClientMethod='put_object',
                                                    Params={'Bucket': 'www.chadpaste.com',
                                                            'Key': 'images/' + name,
                                                            'ContentType': file_spec['type']
                                                            },
                                                    ExpiresIn=1000),
            'name': name}

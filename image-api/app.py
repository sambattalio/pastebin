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
    name = randomString() + '.' + file_spec['name'].split('.')[1]
    return {'url': s3_client.generate_presigned_url(ClientMethod='put_object',
                                                    Params={'Bucket': 'chadpaste.com',
                                                            'Key': 'f/' + name,
                                                            'ContentType': file_spec['type']
                                                            },
                                                    ExpiresIn=20),
            'name': name}


@app.route('/test', methods=['POST'], cors=True)
def post_image():
    f    = app.current_request.raw_body
    mime = magic.from_buffer(f, mime=True)

    #s3_client.put_object(Body=f, Bucket='chadpaste.com', Key='f/'+name)
    return {'test': magic.from_buffer(f, mime=True)}

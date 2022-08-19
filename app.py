import requests

response = requests.get(
    'https://data.gov.au/data/api/3/action/datastore_search?resource_id=e9a9ea06-d821-4b53-a05f-877409a1a19c')
print('Your IP is {0}'.format(response.json()))

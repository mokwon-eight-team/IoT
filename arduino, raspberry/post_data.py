import requests,json

URL='http://192.168.103.236:7000/infrareds'

def http_post_data(data):
    while True:
        api_data = {
	        'infraredId':1,
	        'state': data,
        }
        try:
            res=requests.post(URL, json=api_data)
            print(res.status_code)
            res_data = json.loads(res.text)
            print(res_data)
        except:
            print ("connection failed")
        break
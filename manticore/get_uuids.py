
import json

with open('/home/vagrant/projects/search-engines-analysis/manticore/logs/request_4/response.json', 'r') as f:
    loaded_json = json.load(f)

    for i in range(0, 1000):
        print(str(i+1) + ': ' + loaded_json['hits']['hits'][i]['_source']['json']['uuid'])

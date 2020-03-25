import sys
import glob
from pathlib import Path    
from elasticsearch import Elasticsearch

root_dir = sys.argv[1]

elastic_client = Elasticsearch(['localhost'], port=9200)

for path in glob.iglob(root_dir +'/**', recursive=True):
    filename = Path(path).name
    if (filename.startswith('blogs') or filename.startswith('news')) and filename.endswith('.json'):
        try:
            file = open(path, 'r').read()
            elastic_client.index(index='news_articles', doc_type='Blog', body=file)
        except:
            print("Error when indexing: " + filename)

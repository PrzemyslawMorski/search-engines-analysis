import os
import pathlib
from elasticsearch import Elasticsearch
from elasticsearch.helpers import streaming_bulk
import json

ELASTICSEARCH_URL = os.getenv('ELASTICSEARCH_URL', 'http://ip172-18-0-47-bqamksqosm4g0099v8c0-9200.direct.labs.play-with-docker.com')
QUERIES_PATH = os.getenv('QUERY_PATH', 'queries')

def main():
    client = Elasticsearch(
        hosts=[ELASTICSEARCH_URL]
    )

    for filename in os.listdir(QUERIES_PATH):
        with open(os.path.join(QUERIES_PATH, filename), "r", encoding="utf8") as query_file:
            if not filename.startswith("result_") and filename.endswith(".json"):
                query = query_file.read()
                result = client.search(body = query, index="news_articles")
                with open(os.path.join(QUERIES_PATH, 'result_' + os.path.basename(filename) + '.txt'), "w", encoding="utf8") as query_file:
                    query_file.write(json.dumps(result))

if __name__ == "__main__":
    main()
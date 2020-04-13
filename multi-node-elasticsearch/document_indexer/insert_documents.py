import os
import tqdm
from elasticsearch import Elasticsearch
from elasticsearch.helpers import streaming_bulk

ELASTICSEARCH_URL = os.getenv('ELASTICSEARCH_URL', 'localhost:9200')
DATASET_PATH = os.getenv('DATASET_PATH', 'documents_bulk.json')
INSERT_CHUNK_SIZE = int(os.getenv('INSERT_CHUNK_SIZE', '500'))

def generate_documents():
    with open(DATASET_PATH, "r", encoding="utf8") as f:
        for line in f:
            yield line

def main():
    client = Elasticsearch(
        timeout=30,
        hosts=[ELASTICSEARCH_URL]
    )

    client.indices.create('news_articles', body={
        "settings": {
            "number_of_shards": 4
        }
    })

    with open(DATASET_PATH, "r", encoding="utf8") as f:
        number_of_docs = sum([1 for _ in f]) - 1

    print("Indexing documents...")
    progress = tqdm.tqdm(unit="docs", total=number_of_docs)
    successes = 0
    for ok, action in streaming_bulk(
        client=client, chunk_size = INSERT_CHUNK_SIZE, index="news_articles", actions=generate_documents(),
    ):
        progress.update(1)
        successes += ok
    print("Indexed %d/%d documents" % (successes, number_of_docs))

if __name__ == "__main__":
    main()

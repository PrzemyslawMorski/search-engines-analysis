#!/bin/bash

ELASTICSEARCH_URL=${ELASTICSEARCH_URL:=localhost:9200}
INDEXING_OUTPUT=${INDEXING_OUTPUT:=.}
INDEXING_INPUT=${INDEXING_INPUT:=./indexing_input}

echo "RECREATING NEWS_ARTICLE INDEX"
curl -XDELETE http://$ELASTICSEARCH_URL/news_articles
curl -X PUT "$ELASTICSEARCH_URL/news_articles?pretty" -H 'Content-Type: application/json' -d'
{
    "settings" : {
        "number_of_shards" : 4
    }
}
'

echo "INSERTING DATA"
for f in $INDEXING_INPUT
do
    echo "INSERTING DATA FROM: $f"
    echo $(curl -XGET http://$ELASTICSEARCH_URL/news_articles/_stats/indexing) >> $INDEXING_OUTPUT/indexing-times.txt
    curl --write-out '%{http_code}' --silent --output -XPOST http://$ELASTICSEARCH_URL/news_articles/_doc/_bulk?pretty -H "Content-Type: application/x-ndjson"  --data-binary @"$f" 
    echo "INSERTED DATA FROM $f"
done


echo "DATA INSERTED YEEEY"
echo $(curl -XGET http://$ELASTICSEARCH_URL/news_articles/_stats/indexing) >> $INDEXING_OUTPUT/indexing-times.txt

echo "RESULTS FILE:"
cat $INDEXING_OUTPUT/indexing-times.txt

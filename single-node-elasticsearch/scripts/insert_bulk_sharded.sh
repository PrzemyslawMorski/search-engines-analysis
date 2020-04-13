ELASTICSEARCH_URL=${ELASTICSEARCH_URL:=ip172-18-0-41-bqa7aqdim9m000fjkis0-9200.direct.labs.play-with-docker.com}

echo "REWRITE NEWS_ARTICLE INDEX"
curl -XDELETE http://$ELASTICSEARCH_URL/news_articles
curl -X PUT "$ELASTICSEARCH_URL/news_articles?pretty" -H 'Content-Type: application/json' -d'
{
    "settings" : {
        "number_of_shards" : 4
    }
}
'

echo "INSERTING DATA"

for i in $(seq 1 21);
do
    echo "INSERTING DATA $i of 21"
    echo "output/output$i.json"
    echo $(curl -XGET http://$ELASTICSEARCH_URL/news_articles/_stats/indexing) >> indexing-times.txt
    curl --write-out '%{http_code}' --silent --output -XPOST http://$ELASTICSEARCH_URL/news_articles/_doc/_bulk?pretty -H "Content-Type: application/x-ndjson"  --data-binary @"/app/output/documents_bulk$i.json" 
    echo "INSERTED DATA $i"
done

echo "DATA INSERTED YEEEY"
echo $(curl -XGET http://$ELASTICSEARCH_URL/news_articles/_stats/indexing) >> indexing-times.txt

echo "RESULTS FILE:"
cat indexing-times.txt

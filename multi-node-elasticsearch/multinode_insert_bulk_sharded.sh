ELASTICSEARCH_URL=${ELASTICSEARCH_URL:=localhost:9200}

echo "RECREATE NEWS_ARTICLE INDEX"
curl -X DELETE http://$ELASTICSEARCH_URL/news_articles
curl -X PUT "http://$ELASTICSEARCH_URL/news_articles?pretty" -H 'Content-Type: application/json' -d'
{
    "settings" : {
        "number_of_shards" : 3,
        "number_of_replicas" : 1
    }
}
'

mkdir logs

echo "INSERTING DATA"
for i in $(seq 1 21);
do
    echo "Run res_usage_log.sh"
    bash res_usage_log.sh es01 logs/usage_log_es01_$i.log &
    log_es01_pid=$(echo $!)
    bash res_usage_log.sh es02 logs/usage_log_es02_$i.log &
    log_es02_pid=$(echo $!)
    bash res_usage_log.sh es03 logs/usage_log_es03_$i.log &
    log_es03_pid=$(echo $!)

    echo "INSERTING DATA $i of 21"
    echo $(curl -XGET http://$ELASTICSEARCH_URL/news_articles/_stats/indexing) >> logs/indexing-times.txt
    curl --write-out '%{http_code}' --silent --output -XPOST http://$ELASTICSEARCH_URL/news_articles/_doc/_bulk?pretty -H "Content-Type: application/x-ndjson"  --data-binary @"output/documents_bulk$i.json" 
    echo "INSERTED DATA $i"

    echo "Kill res_usage_log.sh"
    kill $log_es01_pid
    kill $log_es02_pid
    kill $log_es03_pid
done

echo "DATA INSERTED YEEEY"
echo $(curl -XGET http://$ELASTICSEARCH_URL/news_articles/_stats/indexing) >> indexing-times.txt

echo "RESULTS FILE:"
cat indexing-times.txt

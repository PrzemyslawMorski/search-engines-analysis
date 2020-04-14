ELASTICSEARCH_URL=${ELASTICSEARCH_URL:=ip172-18-0-29-bqamksqosm4g0099v8c0-9200.direct.labs.play-with-docker.com}

function elasticsearch() {
    output=$(ssh $ELASTICSEARCH_URL $1)
    echo $output
}

echo "REWRITE NEWS_ARTICLE INDEX"
curl -XDELETE http://$ELASTICSEARCH_URL/news_articles
curl -X PUT "$ELASTICSEARCH_URL/news_articles?pretty" -H 'Content-Type: application/json' -d'
{
    "settings" : {
        "number_of_shards" : 4,
        "number_of_replicas" : 2
    }
}
'

echo "INSERTING DATA"

for i in $(seq 1 21);
do
    echo "Create dir /root/logs"
    elasticsearch "mkdir -p /root/logs/indexing/$i"

    echo "Run res_usage_log.sh"
    res_usage_out=$(elasticsearch "/root/search-engines-analysis/single-node-elasticsearch/scripts/res.sh /root/logs/indexing/res_usage_$i.log")

    echo "INSERTING DATA $i of 21"
    echo $(curl -XGET http://$ELASTICSEARCH_URL/news_articles/_stats/indexing) >> indexing-times.txt
    curl --write-out '%{http_code}' --silent --output -XPOST http://$ELASTICSEARCH_URL/news_articles/_doc/_bulk?pretty -H "Content-Type: application/x-ndjson"  --data-binary @"output/documents_bulk$i.json" 
    echo "INSERTED DATA $i"

    echo "Kill res_usage_log.sh"
    elasticsearch "pkill res_usage_log"
done

echo "DATA INSERTED YEEEY"
echo $(curl -XGET http://$ELASTICSEARCH_URL/news_articles/_stats/indexing) >> indexing-times.txt

elasticsearch tar -zcvf /root/logging_output.tar.gz /root/logs

echo "RESULTS FILE:"
cat indexing-times.txt

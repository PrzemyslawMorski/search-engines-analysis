ELASTICSEARCH_URL=${ELASTICSEARCH_URL:=localhost:9200}

mkdir logs
mkdir output

for filename in *.json; do
    echo "Run res_usage_log.sh"
    bash res_usage_log.sh elasticsearch logs/elasticsearch_$filename.log &
    log_elasticsearch_pid=$(echo $!)

    echo "QUERYING WITH BODY FROM $filename"
    echo $(curl -X GET -H "Content-Type: application/json" -T $filename "http://$ELASTICSEARCH_URL/news_articles/_search") >> output/$filename

    echo "Kill res_usage_log.sh"
    kill $log_elasticsearch_pid
done

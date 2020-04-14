ELASTICSEARCH_URL=${ELASTICSEARCH_URL:=localhost:9200}

mkdir logs
mkdir output

for filename in *.json; do
    echo "Run res_usage_log.sh"
    bash res_usage_log.sh es01 logs/es01_$filename.log &
    log_es01_pid=$(echo $!)
    bash res_usage_log.sh es02 logs/es02_$filename.log &
    log_es02_pid=$(echo $!)
    bash res_usage_log.sh es03 logs/es03_$filename.log &
    log_es03_pid=$(echo $!)

    echo "QUERYING WITH BODY FROM $filename"
    echo $(curl -X GET -H "Content-Type: application/json" -T $filename "http://$ELASTICSEARCH_URL/news_articles/_search") >> output/$filename

    echo "Kill res_usage_log.sh"
    kill $log_es01_pid
    kill $log_es02_pid
    kill $log_es03_pid
done

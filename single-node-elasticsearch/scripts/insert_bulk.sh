# echo "$(tail /app/documents_bulk_ready_to_add.json)"
echo "sleeps for 99 sec"
sleep 99

echo "REWRITE NEWS_ARTICLE INDEX"
curl -XDELETE http://elasticsearch:9200/news_articles
curl -XPUT http://elasticsearch:9200/news_articles

echo "INSERTING DATA"
echo "start	$(date +"%T")"

for i in $(seq 1 21);
do
    echo "INSERTING DATA $i of 21"
    echo "output/output$i.json"
    echo $(curl -XGET http://elasticsearch:9200/news_articles/_stats/indexing) >> /app/indexing-times.txt
    curl --write-out '%{http_code}' --silent --output -XPOST http://elasticsearch:9200/news_articles/_doc/_bulk?pretty -H "Content-Type: application/x-ndjson"  --data-binary @"/app/output/output$i.json" 
    echo "$i	$(date +"%T")" >> /app/times.csv
    echo "INSERTED DATA $i"
done


echo "DATA INSERTED YEEEY"
sleep 10
echo $(curl -XGET http://elasticsearch:9200/news_articles/_stats/indexing) >> /app/indexing-times.txt

echo "RESULTS FILE:"
cat /app/indexing-times.txt
cat /app/times.csv

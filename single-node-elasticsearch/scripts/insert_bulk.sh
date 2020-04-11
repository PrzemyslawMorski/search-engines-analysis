# echo "$(tail /app/documents_bulk_ready_to_add.json)"
echo "CONFIGURING ELASTICSEARCH"
echo "es.client.connection.request.timeout: 1000000" >> /usr/share/elasticsearch/config/elasticsearch.yml
echo "es.client.connect.timeout: 1000000" >> /usr/share/elasticsearch/config/elasticsearch.yml
echo "es.client.socket.timeout: 1000000" >> /usr/share/elasticsearch/config/elasticsearch.yml

echo "INSERTING DATA"
curl -XDELETE http://elasticsearch:9200/news_articles
curl -XPUT http://elasticsearch:9200/news_articles
curl -XPOST http://elasticsearch:9200/news_articles/_bulk?pretty -H "Content-Type: application/x-ndjson"  --data-binary @"/app/documents_bulk_ready_to_add.json"

echo "DATA INSERTED YEEEY"
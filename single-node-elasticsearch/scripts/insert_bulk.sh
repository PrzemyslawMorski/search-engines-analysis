echo "INSERTING DATA"
# echo "$(tail /app/documents_bulk_ready_to_add.json)"
curl -XDELETE http://elasticsearch:9200/news_articles
curl -XPUT http://elasticsearch:9200/news_articles/_bulk?pretty -H "Content-Type: application/x-ndjson"  --data-binary @"/app/documents_bulk_ready_to_add.json"
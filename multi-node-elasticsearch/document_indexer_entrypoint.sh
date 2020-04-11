ls /usr/share/documents

curl \
    -s \
    -H "Content-Type: application/x-ndjson" \
    -XPOST es01:9200/_bulk \
    --data-binary "@/usr/share/documents/documents_bulk_elasicsearch.json"
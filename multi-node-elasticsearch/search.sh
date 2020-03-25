curl -X GET -H "Content-Type: application/json" -T $1 "http://localhost:9200/news_articles/_search" | grep "took"

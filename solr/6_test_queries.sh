while true; do ./resources_usage.sh >> first_query_output.txt; usleep 1000; done&
curl "http://localhost:8983/solr/core/select?q=title%3Amarket&rows=1000" >> first_query_output.txt
cp first_query_output.txt results/first_query_output.txt
while true; do ./resources_usage.sh >> second_query_output.txt; usleep 1000; done&
curl "http://localhost:8983/solr/core/select?q=title%3Amarket%20OR%20text%3Amarket%20OR%20url%3Amarket&rows=1000" >> second_query_output.txt
cp second_query_output.txt results/second_query_output.txt
while true; do ./resources_usage.sh >> third_query_output.txt; usleep 1000; done&
curl "http://localhost:8983/solr/core/select?q=market&rows=1000" >> third_query_output.txt
cp third_query_output.txt results/third_query_output.txt
while true; do ./resources_usage.sh >> fourth_query_output.txt; usleep 1000; done&
curl "http://localhost:8983/solr/core/select?q=Which%20is%20the%20largest%20market%20in%20the%20world?&rows=1000" >> fourth_query_output.txt
cp fourth_query_output.txt results/fourth_query_output.txt
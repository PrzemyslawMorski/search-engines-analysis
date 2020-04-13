echo "INSERTING DATA"

while true; do ./resources_usage.sh >> insert_parts_output.txt; usleep 1000; done&
for i in $(seq 1 21);
do
    echo "INSERTING DATA $i of 21"
    echo "documents_part$i.json"
	curl 'http://localhost:8983/solr/core/update/json/docs?commit=true' --data-binary @"documents_part$i.json" -H 'Content-type:application/json' >> insert_parts_output.txt
done
mkdir results
cp insert_parts_output.txt results/insert_parts_output.txt

echo "DATA INSERTED YEEEY"
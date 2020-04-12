echo "INSERTING DATA"

for i in $(seq 1 21);
do
    echo "INSERTING DATA $i of 21"
    echo "documents_part$i.json"
	curl 'http://localhost:8983/solr/core/update/json/docs?commit=true' --data-binary @"documents_part$i.json" -H 'Content-type:application/json' >> insert_parts_output.txt
done

echo "DATA INSERTED YEEEY"
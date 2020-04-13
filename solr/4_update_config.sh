curl 'http://localhost:8983/solr/core/update/json/docs?commit=true' --data-binary @"documents_part1.json" -H 'Content-type:application/json'
cp managed-schema data/core/conf/managed-schema
curl "localhost:8983/solr/core/update?commit=true" -H "Content-Type: text/xml" --data-binary '<delete><query>*:*</query></delete>'
curl 'localhost:8983/solr/admin/cores?action=RELOAD&core=core'
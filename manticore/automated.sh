#!/bin/bash

mysql_node=$1
manticore_node=$2

mysql_node="ip172-18-0-28-bqacfeqosm4g0088r9k0@direct.labs.play-with-docker.com"
manticore_node="ip172-18-0-44-bqacfeqosm4g0088r9k0@direct.labs.play-with-docker.com"

function mysql() {

    output=$(ssh $mysql_node $1)
    echo $output
}

function manticore() {

    output=$(ssh $manticore_node $1)
    echo $output
}


function main() {

    echo "Reset schema"

    mysql "docker exec -t manticore_db /bin/sh -c \"mysql -u root -ppassword < /tmp/data/schema.sql\""

    for i in {15000..315000..15000}
        do 
            mysql_command="\"head -n $i /tmp/data/splited/merged.sql | tail -n 15000 | mysql manticore -u root -ppassword\""

            echo "Input to DB - $i"

            mysql "docker exec -t manticore_db /bin/sh -c $mysql_command"

            echo "Get count from DB"

            count=$(mysql "docker exec -t manticore_db /bin/sh -c \"echo 'select count(*) from blog;' | mysql manticore -u root -ppassword\"" | tail -n 1 | sed -nr 's/[^0-9]*([0-9]+).*/\1/p')

            echo "Count: $count"

            while [ "$count" -ne "$i" ]; do
                echo "Count not ok: $count != $i"
                sleep 2
                echo "Get count from DB (while)"
                count=$(mysql "docker exec -t manticore_db /bin/sh -c \"echo 'select count(*) from blog;' | mysql manticore -u root -ppassword\"" | tail -n 1 | sed -nr 's/[^0-9]*([0-9]+).*/\1/p')
                echo "Count: $count"
            done

            echo "Create dir /root/logs/$i"
            manticore "mkdir -p /root/logs/$i"

            echo "Run res_usage_output.sh"
            res_usage_out=$(manticore "/root/search-engines-analysis/manticore/res.sh /root/logs/$i/res_usage_$i.log")

            echo "Run indexer"

            manticore "docker exec -t -u manticore manticore_search /bin/sh -c \"indexer financial_news --rotate\" >> /root/logs/$i/indexer_$i.log"
            
            echo "Kill res_usage_output.sh"

            manticore "pkill res_usage_log"
        done
}

main


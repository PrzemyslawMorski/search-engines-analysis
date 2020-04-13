#!/bin/bash

mysql_node=$1

manticore_node=$2

function mysql() {
    return $(ssh $mysql_node $1)
}

function manticore() {
    ssh $manticore_node $1
}

for i in {15000..45000..15000}
    do 
        mysql_command = "\"head -n $i /tmp/data/splited/merged.sql | tail -n 15000 | mysql manticore -u root -ppassword\""
        mysql "docker exec -t manticore_db /bin/sh -c $mysql_command"

        count=$(mysql "docker exec -t manticore_db /bin/sh -c \"echo 'select count(*) from blog;' | mysql manticore -u root -ppassword\"" | tail -n 1)

        while [ "$count" -ne "$i" ]; do
            sleep 2
            count=$(mysql "docker exec -t manticore_db /bin/sh -c \"echo 'select count(*) from blog;' | mysql manticore -u root -ppassword\"" | tail -n 1)
        done

        res_usage_out=$(manticore "while true; do /root/search-engines-analysis/manticore/res_usage_log.sh >> /root/logs/$i/res_usage_$i.log; sleep 1; done")
        res_usage_pid="${res_usage_out:4:5}"

        manticore "mkdir -p /root/logs/$i"
        manticore "docker exec -t -u manticore manticore_search /bin/sh -c \"indexer financial_news\" >> /root/logs/indexer_$i.log"
        
        manticore "kill $res_usage_pid"
    done



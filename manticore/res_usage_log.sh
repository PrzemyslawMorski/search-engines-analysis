#!/bin/bash

log_file=$1

while true; do
    stats=$(docker stats --all --no-stream --format "table {{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" manticore_search)
    echo -e "$stats\n" >> $log_file
    sleep 1; 
done
#!/bin/bash

container_name=$1
log_file=$2

while true; do
    stats=$(docker stats --all --no-stream --format "table {{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" $container_name)
    echo -e "$stats\n" >> $log_file
    sleep 0.5;
done


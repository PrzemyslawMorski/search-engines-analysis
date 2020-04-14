#!/bin/bash

log_file=$1

while true; do
    stats=$(docker stats --all --no-stream --format "table {{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" elasticsearch)
    echo -e "$stats\n" >>$log_file
    sleep 0.5
done

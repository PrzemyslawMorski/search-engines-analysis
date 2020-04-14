#!/bin/bash
 
sh -c "nohup /root/search-engines-analysis/single-node-elasticsearch/scripts/res_usage_log.sh $1 > /dev/null 2>&1 &"
disown
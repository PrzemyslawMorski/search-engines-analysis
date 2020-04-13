#!/bin/bash
 
sh -c "nohup /root/search-engines-analysis/manticore/res_usage_log.sh $1 > /dev/null 2>&1 &"
disown
log_file=$1
echo "usage log started"
while true; do
    stats=$(docker stats --all --no-stream --format "table {{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" elasticsearch)
    echo -e "$(date +"%T")\n $stats\n" >>$log_file
    sleep 0.5
done
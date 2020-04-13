grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {print "CPU: " usage "%"}'
free -m | awk 'NR==2{printf "Memory: %s/%sMB (%.3f%%)\n", $3,$2,$3*100/$2 }'
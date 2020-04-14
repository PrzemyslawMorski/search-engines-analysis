#!/bin/bash

uid=( 046c4b25cf612675f66c5ab8ecf97b6c116f8efa 25eb2ae82e0096ae48911474a1778dfd777f4ab3 6cd6b4a0d01fc8de9e0b8b6b38e7110a668cf7c8 d84bf66f4fb36cae4b638873af910d1b948e6ef2 fcfef6327a65ba0ea3daa9404b4a2bd75c55806a 99475a1a1d469b859ebac5f341f5ced5ed638d2e 1b0ae96dc3dd50ef50d00d50116c77aabf7af395 52db5f0b9e8d7a90a60b2a8e8658c6ac36f02b32 65d0fa6478685d9c2ac16206f8814b427d77b752 4f7f9f635d0d99ca08d49da2ef843dea573a4561 )


j=1

for i in "${uid[@]}"
do
    
	text=$(cat ./data/documents.sql | grep "$i")

    # which=$(echo "$text|" | grep -o -i "which" | wc -l)
    # is=$(echo "$text|" | grep -o -i "is" | wc -l)
    # the=$(echo "$text|" | grep -o -i "the" | wc -l)
    # larg=$(echo "$text|" | grep -o -i "larg" | wc -l)
    # close=$(echo "$text|" | grep -o -i "close" | wc -l)
    # in=$(echo "$text|" | grep -o -i "in" | wc -l)
    # world=$(echo "$text|" | grep -o -i "world" | wc -l)
    
    
    largest_market=$(echo "$text|" | grep -o -i "largest market" | wc -l)
    the_largest=$(echo "$text|" | grep -o -i "the largest" | wc -l)
    the_world=$(echo "$text|" | grep -o -i "the world" | wc -l)
    in_the_world=$(echo "$text|" | grep -o -i "in the world" | wc -l)
    which_is=$(echo "$text|" | grep -o -i "which is" | wc -l)
    market_in_the_world=$(echo "$text|" | grep -o -i "market in the world" | wc -l)


    # sum=$(($which+$is+$the+$larg+$close+$in+$world))
    sum=$(($largest_market+$in_the_world+$the_world+$which_is+$market_in_the_world+$the_largest))

    nr=$j
    j=$((j+1))

    echo -e "\n\n$nr:"
    # echo "which: $which"
    # echo "is: $is"
    # echo "the: $the"
    # echo "larg: $larg"
    # echo "close: $close"
    # echo "on: $in"
    # echo "world: $world"
    # echo "sum: $sum"
    echo "largest_market: $largest_market"
    echo "in_the_world: $in_the_world"
    echo "the_world: $the_world"
    echo "which_is: $which_is"
    echo "market_in_the_world: $market_in_the_world"
    echo "the_largest: $the_largest"
    echo "sum: $sum"
done





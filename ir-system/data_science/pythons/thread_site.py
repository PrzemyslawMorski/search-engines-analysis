import glob
import json

root_dir = "/home/vagrant/projects/financial_data/data/"

distinctVals = {}

index = 1 

for filename in glob.iglob(root_dir + '**/*.json', recursive=True):
    
    index = index + 1
    with open(filename, 'r') as f:
        article = json.load(f)

        currentElem = article["thread"]["site"]

        if currentElem in distinctVals:
            distinctVals[currentElem] = distinctVals[currentElem]+1
        else: 
            distinctVals[currentElem] = 1


sortedElems = sorted(distinctVals.items(), key=lambda x: x[1])  

for i in sortedElems:
    print(i)


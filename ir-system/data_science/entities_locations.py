import glob
import json

root_dir = "./"

distinctVals = {}

index = 1 

for filename in glob.iglob(root_dir + '**/*.json', recursive=True):
    
    index = index + 1
    with open(filename, 'r') as f:
        article = json.load(f)

        currentEl = article["entities"]["locations"]

        for currentEle in currentEl:

            currentElem = currentEle["name"]

            if currentElem in distinctVals:
                distinctVals[currentElem] = distinctVals[currentElem]+1
            else: 
                distinctVals[currentElem] = 1


sortedElems = sorted(distinctVals.items(), key=lambda x: x[1])  

for i in sortedElems:
    print(i)


import sys
import glob
from pathlib import Path

input_file = sys.argv[1]
output_file = sys.argv[2]
LINES_IN_FILE = 15000

print("TRANSFORMING FILE")
with open(input_file, "r", encoding="utf8") as input_file:
    fileNumber = 1
    hasMoreLines = True
    while(hasMoreLines):
        filename="./output/" + output_file+str(fileNumber)+".json"
        with open(filename, "w", encoding="utf8") as transformed:
            j = 0 
            print("{} opened".format(filename))
            while j < LINES_IN_FILE:
                line = input_file.readline()
                if not line: 
                    hasMoreLines=False
                    break
                # transformed.writelines(['{ "index" : { "_index" : "news_articles"} }\n', line])
                transformed.writelines([line])
                j=j+1
            fileNumber = fileNumber + 1

## HOW TO RUN SCRIPT
# 1. CREATE FOLDER OUTPUT in this directory
# 2. py transform_to_insert.py documents_bulk.json outputfielname
# 3. output files structure is as follows: outputfilename + currentIndex + .json

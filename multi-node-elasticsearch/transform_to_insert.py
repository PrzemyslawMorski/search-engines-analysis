import sys
import glob
from pathlib import Path

input_file = sys.argv[1]
output_file = sys.argv[1]


with open(input_file, "r", encoding="utf8") as input_file:
    with open(output_file, "w", encoding="utf8") as transformed:
        while True:
            line = input_file.readline()
            if not line: 
                break
            transformed.writelines(['{ "index" : { "_index" : "news_articles"} }\n', line])
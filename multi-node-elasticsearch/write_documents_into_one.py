import sys
import glob
from pathlib import Path

root_dir = sys.argv[1]
result_file_path = sys.argv[2]

# num_files = int(sys.argv[3])
# num_indexed = 1

with open(result_file_path, "a", encoding="utf8") as myfile:
    for path in glob.iglob(root_dir + '/**', recursive=True):
        # if num_indexed > num_files:
            # break
        filename = Path(path).name
        print('checking if should index: ' + filename)
        if (filename.startswith('blogs') or filename.startswith('news')) and filename.endswith('.json'):
            try:
                file = open(path, 'r', encoding="utf8").read()
                # myfile.writelines('{ "index" : { "_index" : "news_articles"} }\n')
                myfile.write(file + '\n')
                # num_indexed = num_indexed + 1
            except Exception as e:
                print("Error " + e + "when reading " + filename)
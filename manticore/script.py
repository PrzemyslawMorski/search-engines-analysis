# Converts .json to .sql

import json

with open('./data/documents.json') as json_file:
    data = json.load(json_file)

    with open("./data/documents.sql", "a") as myfile:

        i = 1
        for row in data:
            
            if (i % 100 == 0): 
                print(i)

            url = row["url"].translate(str.maketrans({"'":  r"''", "\n": " "}))
            title = row["title"].translate(str.maketrans({"'":  r"''", "\n": " ", "\\": ""}))
            text = row["text"].translate(str.maketrans({"'":  r"''", "\n": " ", "\\": ""}))

            del row["url"]
            del row["title"]
            del row["text"]

            plain_json = json.dumps(row).translate(str.maketrans({"'":  r"''", "\n": " "}))

            myfile.write(f"insert into blog (url, title, text, json) VALUES('{url}','{title}','{text}','{plain_json}');\n")
            
            i += 1
            
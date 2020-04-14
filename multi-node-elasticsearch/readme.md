# Multi-node elasticsearch analysis

## Reproducing

Reproduction steps:

1. Download the new articles from <https://www.kaggle.com/jeet2016/us-financial-news-articles>
2. Setup ELK stack - docker-compose up -d
3. Run insert_documents.py with a path to extracted new articles' root path

## Scripts

### Index docs

Works recursively with 1 object per document

    py insert_documents.py \$news_articles_root_dir

## Write to bulk insert file

Params:

- news articles root directory path
- output file path
- number of entries to write

Script:

    py write_documents_into_one.py news_articles_root_dir output_file \$num_entries_to_read

## bulk insert

Params:

- input file path

Note: max doc count is around 80-100k

Script:

    bash insert_bulk.sh \$file_with_docs

## clear index

Params:

- index name

Script:

    bash clear_index.sh \$index_name

## search

Params:

- path to file containing query body

Script:

    bash search.sh \$file_containing_query_body

### Postman collection

`Elasticsearch single node.postman_collection.json` contains basic requests like index doc, index bulk, search and delete index.

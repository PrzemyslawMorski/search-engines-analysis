FROM python

WORKDIR /document_indexer

COPY requirements.txt requirements.txt

RUN python -m pip install -r requirements.txt

# DOWNLOAD DOCUMENTS_BULK.JSON FROM https://drive.google.com/open?id=1um7Rz55nXLAiZWkbzj_eVf2eKv1HRxrP
COPY documents_bulk.json documents_bulk.json
COPY insert_documents.py insert_documents.py

ENV ELASTICSEARCH_URL "localhost:9200"
ENV DATASET_PATH "documents_bulk.json"
ENV INSERT_CHUNK_SIZE 500

ENTRYPOINT ["python", "insert_documents.py"]
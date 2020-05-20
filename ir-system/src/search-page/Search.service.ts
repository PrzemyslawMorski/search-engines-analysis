import axios from "axios";
import { Article } from "../models/Article";
import { SearchResponse } from '../models/SearchResponse';
import constants from '../constants';

export default class SearchService {

    async loadArticles(query: string, last?: Article): Promise<Article[]> {
        let result: Article[] = [];
        const body: any = {
            size: 10,
            sort: [
                "_score",
                { "uuid.keyword": "asc" }
            ],
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": [
                        "title",
                        "text",
                        "entities.locations.name",
                        "entities.organizations.name",
                        "entities.persons.name"
                    ]
                }
            }
        };

        if (last) {
            // if you add another field to sort then you need to add that field's value to search_after
            // the order of fields in search_after needs to match the order of sort fields
            // all field values for search_after can be accessed in the `last` object
            body.search_after = [last._score, last._source.uuid];
        }

        const response = await axios.post<SearchResponse<Article>>(constants.news_articles_search_url, body);
        console.log(response.data);
        result = response.data.hits.hits;

        return result;
    }
}
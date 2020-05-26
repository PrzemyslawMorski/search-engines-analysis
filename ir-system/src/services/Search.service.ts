import axios from "axios";
import { Article } from "../models/Article";
import { SearchResponse } from '../models/SearchResponse';
import constants from '../config/constants';

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

    async customQueryArticles(query: any, sort?:any, last?: Article): Promise<Article[]> {
        if(!sort) {
            sort = [
                "_score",
                { "uuid.keyword": "asc" }
            ]
        }
        let result: Article[] = [];
        const body: any = {
            size: 5,
            sort,
            "query": query
        };

        if (last) {
            // if you add another field to sort then you need to add that field's value to search_after
            // the order of fields in search_after needs to match the order of sort fields
            // all field values for search_after can be accessed in the `last` object
            body.search_after = [last._score, last._source.uuid];
        }
        console.log(body);
        const response = await axios.post<SearchResponse<Article>>(constants.news_articles_search_url, body);
        console.log(response.data);
        result = response.data.hits.hits;

        return result;
    }

    async getCount(query:any): Promise<number>{
        console.log("getting count of: ", query);
        const response = await axios.post<{count: number}>(constants.news_articles_count_url, query);
        console.log("got count response", response);
        return response.data.count;

    }
}
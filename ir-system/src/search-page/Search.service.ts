import axios from "axios";
import { Article } from "../models/Article";
import { SearchResponse } from '../models/SearchResponse';
import constants from '../constants';

export default class SearchService {

    private processQuery(query: string) {
        return {
            query: {
                match: {
                    title: query
                }
            }
        }
    }

    async loadArticles(query: string, last?: Article): Promise<Article[]> {
        let result: Article[] = [];
        const body: any = {
            size: 10,
            sort: [
                { "uuid.keyword": "asc" }
            ],
            ...this.processQuery(query)
        };

        if (last) {
            // if you add another field to sort then you need to add that field's value to search_after
            // the order of fields in search_after needs to match the order of sort fields
            // all field values for search_after can be accessed in the `last` object
            body.search_after = [last._source.uuid];
        }

        const response = await axios.post<SearchResponse<Article>>(constants.news_articles_search_url, body);
        console.log(response.data);
        result = response.data.hits.hits;

        return result;
    }
}
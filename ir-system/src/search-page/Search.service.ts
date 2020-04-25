import axios from "axios";
import { Article } from "../models/Article";
import { SearchResponse } from '../models/SearchResponse';

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
            body.searchAfter = [last._source.uuid];
        }

        const response = await axios.post<SearchResponse<Article>>('http://localhost:9200/news_articles/_search', body);
        console.log(response.data);
        result = response.data.hits.hits;

        return result;
    }
}
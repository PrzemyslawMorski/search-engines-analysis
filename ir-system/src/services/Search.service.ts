import axios from "axios";
import { Article } from "../models/Article";
import { SearchResponse } from '../models/SearchResponse';
import constants from '../config/constants';
import { Filter, Filters, FilterFields } from '../pages/results-page/components/FiltersBar';

export default class SearchService {

    private setFilters(body: any, filters?: Filters) {
        const elasticsearchFilters: any[] = [];
        if (filters?.authors && filters.authors.length > 0) {
            elasticsearchFilters.push({ "terms": { [FilterFields.Authors]: filters.authors.map(x => x.value) } });
        }
        if (filters?.organisations && filters.organisations.length > 0) {
            elasticsearchFilters.push({ "terms": { [FilterFields.Organisations]: filters.organisations.map(x => x.value) } });
        }
        if (filters?.people && filters.people.length > 0) {
            elasticsearchFilters.push({ "terms": { [FilterFields.People]: filters.people.map(x => x.value) } });
        }
        if (filters?.locations && filters.locations.length > 0) {
            elasticsearchFilters.push({ "terms": { [FilterFields.Locations]: filters.locations.map(x => x.value) } });
        }
        if (filters?.dateFrom) {
            elasticsearchFilters.push({ "range": { [FilterFields.PublishDate]: { "gte": filters.dateFrom } } });
        }
        if (filters?.dateTo) {
            elasticsearchFilters.push({ "range": { [FilterFields.PublishDate]: { "lte": filters.dateTo } } });
        }

        if (elasticsearchFilters.length > 0) {
            body.query.bool.filter = elasticsearchFilters;
        }
    }

    private setSortAndQuery(body: any, query: string, last?: Article) {
        body["sort"] = [
            "_score",
            { "uuid.keyword": "asc" }
        ];

        body["query"] = {
            "bool": {
                "must": {
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
            }
        }

        if (last) {
            // if you add another field to sort then you need to add that field's value to search_after
            // the order of fields in search_after needs to match the order of sort fields
            // all field values for search_after can be accessed in the `last` object
            body.search_after = [last._score, last._source.uuid];
        }
    }

    async loadArticles(query: string, filters?: Filters, last?: Article): Promise<Article[]> {
        let result: Article[] = [];

        const body: any = {
            size: 20
        };

        this.setSortAndQuery(body, query, last);
        this.setFilters(body, filters);

        const response = await axios.post<SearchResponse<Article>>(constants.news_articles_search_url, body);
        console.log(response.data);
        result = response.data.hits.hits;

        return result;
    }

    async customQueryArticles(query: any, sort?: any, last?: Article): Promise<Article[]> {
        if (!sort) {
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

    async aggregateByQuery(query: string, field: string, filters?: Filters): Promise<Filter[]> {
        let result: Filter[] = [];

        const body: any = {
            size: 0,
            "aggs": {
                "genres": {
                    "terms": {
                        "field": field
                    }
                }
            }
        };

        this.setSortAndQuery(body, query);
        this.setFilters(body, filters);

        const response = await axios.post<SearchResponse<Article>>(constants.news_articles_search_url, body);
        result = response.data.aggregations.genres.buckets
            .filter(bucketItem => bucketItem.key !== '')
            .map(bucketItem => ({
                label: `${(bucketItem.key as string).toLocaleUpperCase()} (${bucketItem.doc_count})`,
                value: bucketItem.key as string
            }));

        return result;
    }

    async getCount(query: any): Promise<number> {
        console.log("getting count of: ", query);
        const response = await axios.post<{ count: number }>(constants.news_articles_count_url, query);
        console.log("got count response", response);
        return response.data.count;
    }
}
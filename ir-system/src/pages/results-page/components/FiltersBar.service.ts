import axios from "axios";
import { SearchResponse } from "../../../models/SearchResponse";
import { Article } from "../../../models/Article";
import { Filter } from "./FiltersBar";
import constants from "../../../config/constants";

export enum FilterFields {
    Locations = "entities.locations.name.keyword",
    People = "entities.persons.name.keyword",
    Authors = "author.keyword",
    Organisations = "entities.organizations.name.keyword"
}

export default class FiltersBarService {

    async aggregateFilter(filter: FilterFields, uppercase = false) {
        return this.getAggregatedFilters(filter, uppercase);
    }

    private async getAggregatedFilters(field: string, uppercase: boolean): Promise<Filter[]> {
        let result: Filter[] = [];
        const body: any = {
            "size": 0,
            "aggs": {
                "genres": {
                    "terms": {
                        "field": field
                    }
                }
            }
        };

        const response = await axios.post<SearchResponse<Article>>(constants.news_articles_search_url, body);
        result = response.data.aggregations.genres.buckets
            .filter(bucketItem => bucketItem.key !== '')
            .map(bucketItem => ({
                label: `${uppercase ? (bucketItem.key as string).toLocaleUpperCase() : bucketItem.key as string} (${bucketItem.doc_count})`,
                value: bucketItem.key as string
            }));
        console.log(result);

        return result;
    }
}
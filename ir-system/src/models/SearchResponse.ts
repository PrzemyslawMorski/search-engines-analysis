export interface TotalStats {
    value: number;
    relation: string;
}

export interface HitsStats<T> {
    total: TotalStats;
    max_score: number;
    hits: T[];
}

export interface ShardStats {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
}

export interface GenresAggregation {
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
    buckets: { key: any, doc_count: number }[];
}

export interface Aggregations {
    genres: GenresAggregation;
}

export interface SearchResponse<T> {
    took: number;
    timed_out: boolean;
    shards: ShardStats;
    hits: HitsStats<T>;
    aggregations: Aggregations;
}
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

export interface SearchResponse<T> {
    took: number;
    timed_out: boolean;
    shards: ShardStats;
    hits: HitsStats<T>;
}
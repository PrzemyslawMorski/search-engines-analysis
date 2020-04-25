export interface SocialStats {
    likes: number;
    shares: number;
    comments: number;
}

export interface Social {
    [portalName: string]: SocialStats;
}

export interface Thread {
    social: Social;
    site_full: string;
    main_image: string;
    site_section: string;
    section_title: string;
    url: string;
    country: string;
    domain_rank: number;
    title: string;
    performance_score: number;
    site: string;
    participants_count: number;
    title_full: string;
    spam_score: number;
    site_type: string;
    published: Date;
    replies_count: number;
    uuid: string;
}

export interface Person {
    name: string;
    sentiment: string;
}

export interface Location {
    name: string;
    sentiment: string;
}

export interface Organization {
    name: string;
    sentiment: string;
}

export interface Entities {
    persons: Person[];
    locations: Location[];
    organizations: Organization[];
}

export interface Source {
    organizations: any[];
    uuid: string;
    thread: Thread;
    author: string;
    url: string;
    ord_in_thread: number;
    title: string;
    locations: any[];
    entities: Entities;
    highlightText: string;
    language: string;
    persons: any[];
    text: string;
    external_links: string[];
    published: Date;
    crawled: Date;
    highlightTitle: string;
}

export interface Fields {
    "thread.published": Date[];
    crawled: Date[];
    published: Date[];
}

export interface Article {
    _index: string;
    _type: string;
    _id: string;
    _version: number;
    _score: number;
    _source: Source;
    fields: Fields;
}


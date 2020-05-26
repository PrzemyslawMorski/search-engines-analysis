import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Select, { ValueType } from 'react-select'
import ReactDatePicker from "react-datepicker";
import SearchService from '../../../services/Search.service';

type FiltersBarProps = Readonly<{
    query: string,
    onFiltersChange: (filters: Filters) => void
}>

export enum FilterFields {
    Locations = "entities.locations.name.keyword",
    People = "entities.persons.name.keyword",
    Authors = "author.keyword",
    Organisations = "entities.organizations.name.keyword",
    PublishDate = "published"
}

const FiltersBar = ({ query, onFiltersChange }: FiltersBarProps) => {

    const initialFilters: Filters = {};

    const initialAvailableFilters: ListBasedFilters = {
        locations: [],
        authors: [],
        people: [],
        organisations: []
    };

    const [filters, setFilters] = useState<Filters>(initialFilters)
    const [availableFilters, setAvailableFilters] = useState<ListBasedFilters>(initialAvailableFilters)

    const onLocationsChanged = (value: ValueType<Filter>) => {
        setFilters(prevState => ({ ...prevState, locations: (value as Filter[]) }))
    }

    const onOrganisationsChanged = (value: ValueType<Filter>) => {
        setFilters(prevState => ({ ...prevState, organisations: (value as Filter[]) }))
    }

    const onPeopleChanged = (value: ValueType<Filter>) => {
        setFilters(prevState => ({ ...prevState, people: (value as Filter[]) }))
    }

    const onAuthorsChanged = (value: ValueType<Filter>) => {
        setFilters(prevState => ({ ...prevState, authors: (value as Filter[]) }));
    }

    const onDateFromChanged = (value: Date) => {
        setFilters(prevState => ({ ...prevState, dateFrom: value }));
    }

    const onDateToChanged = (value: Date) => {
        setFilters(prevState => ({ ...prevState, dateTo: value }));
    }

    useEffect(() => {
        onFiltersChange(filters);
    }, [onFiltersChange, filters]);

    useEffect(() => {
        const searchService = new SearchService();
        searchService.aggregateByQuery(query, FilterFields.Locations).then((filters) =>
            setAvailableFilters(prevState => ({ ...prevState, locations: filters })));

        searchService.aggregateByQuery(query, FilterFields.Authors).then((filters) =>
            setAvailableFilters(prevState => ({ ...prevState, authors: filters })));

        searchService.aggregateByQuery(query, FilterFields.Organisations).then((filters) =>
            setAvailableFilters(prevState => ({ ...prevState, organisations: filters })));

        searchService.aggregateByQuery(query, FilterFields.People).then((filters) =>
            setAvailableFilters(prevState => ({ ...prevState, people: filters })));
    }, [query]);

    return (
        <Container>
            <Row>
                <Col>
                    <label htmlFor="authors">Authors</label>
                    <Select id="authors" options={availableFilters.authors} isMulti onChange={onAuthorsChanged} />
                </Col>
                <Col>
                    <label htmlFor="locations">Locations</label>
                    <Select id="locations" options={availableFilters.locations} isMulti onChange={onLocationsChanged} />
                </Col>
                <Col>
                    <label htmlFor="organisations">Organisations</label>
                    <Select id="organisations" options={availableFilters.organisations} isMulti onChange={onOrganisationsChanged} />
                </Col>
                <Col>
                    <label htmlFor="authors">People</label>
                    <Select id="authors" options={availableFilters.people} isMulti onChange={onPeopleChanged} />
                </Col>
            </Row>
            <Row className={"mt-1"}>
                <Col sm={2}>
                    <label htmlFor="dateFrom">From date</label>
                    <ReactDatePicker id={"dateFrom"} className={"form-control"} value={filters.dateFrom?.toLocaleDateString()} onChange={onDateFromChanged} />
                </Col>
                <Col sm={2}>
                    <label htmlFor="dateTo">To date</label>
                    <ReactDatePicker id={"dateTo"} className={"form-control"} value={filters.dateTo?.toLocaleDateString()} onChange={onDateToChanged} />
                </Col>
            </Row>
        </Container>
    )
}

export type Filter = Readonly<{
    value: string
    label: string
}>

export type Filters = Readonly<{
    locations?: Filter[],
    organisations?: Filter[],
    people?: Filter[],
    authors?: Filter[],
    dateFrom?: Date,
    dateTo?: Date
}>

export type ListBasedFilters = Readonly<{
    locations: Filter[],
    organisations: Filter[],
    people: Filter[],
    authors: Filter[]
}>

export default FiltersBar
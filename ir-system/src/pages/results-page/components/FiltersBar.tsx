import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Select, { ValueType } from 'react-select'
import ReactDatePicker from "react-datepicker";
import FiltersBarService, { FilterFields } from "./FiltersBar.service"

type FiltersBarProps = Readonly<{
    onFiltersChange: (filters: Filters) => void
}>

const FiltersBar = ({ onFiltersChange }: FiltersBarProps) => {

    const initialFilters: Filters = { locations: undefined, authors: undefined, people: undefined, organisations: undefined, dateFrom: undefined, dateTo: undefined }
    const initialAvailableFilters: Filters = { locations: [], authors: [], organisations: [], people: [] };

    const [filters, setFilters] = useState<Filters>(initialFilters)
    const [availableFilters, setAvailableFilters] = useState<Filters>(initialAvailableFilters)


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
        onFiltersChange(filters)
    });

    useEffect(() => {
        const filtersBarService = new FiltersBarService();
        filtersBarService.aggregateFilter(FilterFields.Locations, true).then((filters) =>
            setAvailableFilters(prevState => ({ ...prevState, locations: filters })));
        filtersBarService.aggregateFilter(FilterFields.Authors).then((filters) =>
            setAvailableFilters(prevState => ({ ...prevState, authors: filters })));
        filtersBarService.aggregateFilter(FilterFields.Organisations).then((filters) =>
            setAvailableFilters(prevState => ({ ...prevState, organisations: filters })));
        filtersBarService.aggregateFilter(FilterFields.People).then((filters) =>
            setAvailableFilters(prevState => ({ ...prevState, people: filters })));
    }, []);

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

export default FiltersBar
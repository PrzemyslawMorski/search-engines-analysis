import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Select, {ValueType} from 'react-select'
import ReactDatePicker from "react-datepicker";

type FiltersBarProps = Readonly<{
    onFiltersChange: (filters: Filters) => void
}>

const FiltersBar = ({onFiltersChange}: FiltersBarProps) => {

    const initialFilters: Filters = {locations: null, authors: null, organisations: null, dateFrom: null, dateTo: null}

    const [filters, setFilters] = useState<Filters>(initialFilters)

    const locations: Filter[] = [
        {value: "test1", label: "to ma"},
        {value: "test2", label: "byc"},
        {value: "test3", label: "pobrane"},
        {value: "test4", label: "z elastica"}
    ]

    const organisations: Filter[] = [
        {value: "test1", label: "to ma"},
        {value: "test2", label: "byc"},
        {value: "test3", label: "pobrane"},
        {value: "test4", label: "z elastica"}
    ]

    const authors: Filter[] = [
        {value: "test1", label: "to ma"},
        {value: "test2", label: "byc"},
        {value: "test3", label: "pobrane"},
        {value: "test4", label: "z elastica"}
    ]

    const onLocationsChanged = (value: ValueType<Filter>) => {
        setFilters(prevState => ({...prevState, locations: (value as Filter[])}))
    }

    const onOrganisationsChanged = (value: ValueType<Filter>) => {
        setFilters(prevState => ({...prevState, organisations: (value as Filter[])}))
    }

    const onAuthorsChanged = (value: ValueType<Filter>) => {
        setFilters(prevState => ({...prevState, authors: (value as Filter[])}))
    }

    const onDateFromChanged = (value: Date) => {
        setFilters(prevState => ({...prevState, dateFrom: value}))
    }

    const onDateToChanged = (value: Date) => {
        setFilters(prevState => ({...prevState, dateTo: value}))
    }

    useEffect(() => {
        onFiltersChange(filters)
    })

    return (
        <Container>
            <Row>
                <Col>
                    <label htmlFor="locations">Locations</label>
                    <Select id="locations" options={locations} isMulti onChange={onLocationsChanged}/>
                </Col>
                <Col>
                    <label htmlFor="organisations">Organisations</label>
                    <Select id="organisations" options={organisations} isMulti onChange={onOrganisationsChanged}/>
                </Col>
                <Col>
                    <label htmlFor="authors">Authors</label>
                    <Select id="authors" options={authors} isMulti onChange={onAuthorsChanged}/>
                </Col></Row>
            <Row className={"mt-1"}>
                <Col sm={2}>
                    <label htmlFor="dateFrom">From date</label>
                    <ReactDatePicker id={"dateFrom"} className={"form-control"} value={filters.dateFrom?.toLocaleDateString()} onChange={onDateFromChanged}/>
                </Col>
                <Col sm={2}>
                    <label htmlFor="dateTo">To date</label>
                    <ReactDatePicker id={"dateTo"} className={"form-control"} value={filters.dateTo?.toLocaleDateString()} onChange={onDateToChanged}/>
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
    locations: Filter[] | null,
    organisations: Filter[] | null,
    authors: Filter[] | null,
    dateFrom: Date | null,
    dateTo: Date | null
}>

export default FiltersBar
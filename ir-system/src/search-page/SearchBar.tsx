import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

type SearchBarProps = {
    searched: (searchPhrase: string) => void
};
type SearchBarState = {
    searchInput: string;
};
class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    state: SearchBarState = {
        searchInput: ''
    };

    constructor(props: SearchBarProps) {
        super(props);

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.onSearchInputKeyUp = this.onSearchInputKeyUp.bind(this);
    }

    onSearchInputKeyUp(event: React.KeyboardEvent) {
        if (event.key === "Enter" && this.state.searchInput) {
            this.props.searched(this.state.searchInput);
        }
    }

    handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchInput: event.target.value });
    }

    render() {
        return (
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="search-input">Search</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Input your search phrase and press Enter"
                    type="input"
                    aria-label="Search"
                    aria-describedby="search-input"
                    value={this.state.searchInput}
                    onChange={this.handleQueryChange}
                    onKeyUp={this.onSearchInputKeyUp}
                />
            </InputGroup>
        );
    }
}

export default SearchBar;
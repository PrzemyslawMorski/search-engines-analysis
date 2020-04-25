import React from "react";

type MyProps = {
    query: string;
};
type MyState = {
};
class ResultsPage extends React.Component<MyProps, MyState> {
    state: MyState = {
    };
    render() {
        return (
            <div>
                <h2>Results page</h2>
                <h3>{this.props.query}</h3>
            </div>
        );
    }
}

export default ResultsPage;
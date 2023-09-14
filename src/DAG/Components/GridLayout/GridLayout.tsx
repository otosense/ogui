import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import AppTest from '../../Testing/AppTest';

class YourComponent extends React.Component {
    render() {
        return (
            <SplitterLayout vertical={true}>
                <AppTest />
                <h2>Pane 2</h2>
            </SplitterLayout>
        );
    }
}

export default YourComponent;
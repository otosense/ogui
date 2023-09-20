import React, { useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import AppTest from '../../Testing/AppTest';
import { Button, IconButton } from '@mui/material';
import SchemaEditor from '../JSONLayout/SchemaEditor';
import JsonEditor from '../JSONLayout/Schema';

const Layouts = () => {
    const [orientation, setOrientation] = useState(false);

    const onChange = (viewPosition: boolean | ((prevState: boolean) => boolean)) => {
        setOrientation(viewPosition);
    };
    return (
        <>
            <SplitterLayout vertical={orientation} percentage={true} secondaryInitialSize={20} secondaryMinSize={20}>
                <AppTest />
                <JsonEditor layout={onChange} />
            </SplitterLayout>
        </>
    );
};

export default Layouts;

import React, { useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import AppTest from '../../Testing/AppTest';
import { Button, IconButton } from '@mui/material';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import SchemaEditor from '../JSONLayout/SchemaEditor';
import JsonEditor from '../JSONLayout/Schema';

const Layouts = () => {
    const [orientation, setOrientation] = useState(false);
    return (
        <>
            {/* <IconButton onClick={() => setOrientation(!orientation)}>{orientation ? <AlignVerticalBottomIcon /> : <AlignHorizontalLeftIcon />}</IconButton> */}
            <SplitterLayout vertical={orientation} percentage={true} secondaryInitialSize={20} secondaryMinSize={20}>
                <AppTest />
                <>
                    {/* <h2> <p>Pane 2 {orientation ? 'vertical' : 'horizontal'}</p> <IconButton onClick={() => setOrientation(!orientation)} className='layoutToggle'>{<VerticalSplitIcon className='buttonLayoutToggle' />}</IconButton></h2> */}
                    <JsonEditor />
                </>
            </SplitterLayout>
        </>
    );
};

export default Layouts;

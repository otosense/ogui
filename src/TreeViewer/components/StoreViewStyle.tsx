import { styled } from "@mui/styles";
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import { TransitionProps } from '@mui/material/transitions';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from '@react-spring/web';
import { alpha } from '@mui/material/styles';
import React from "react";
type StyledTreeItemProps = {
    rootNode?: boolean;
};

function TransitionComponent(props: TransitionProps) {
    const style = useSpring({
        from: {
            opacity: 0,
            transform: 'translate3d(20px,0,0)',
        },
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

export const StyledTreeItem = styled((props: TreeItemProps) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 11,
        paddingLeft: 18,
        marginBottom: 5,
        borderLeft: `1px dotted #cdcdcd`,
    },
}));
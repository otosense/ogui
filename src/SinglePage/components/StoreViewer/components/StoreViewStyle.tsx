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

// export const StyledTreeItem = styled(TreeItem)<StyledTreeItemProps>(({ rootNode }) => {
//     const borderColor = "gray";

//     return {
//         position: "relative",
//         "&:before": {
//             pointerEvents: "none",
//             content: '""',
//             position: "absolute",
//             width: 32,
//             left: -16,
//             top: 12,
//             borderBottom:
//                 // only display if the TreeItem is not root node
//                 !rootNode ? `1px dashed ${borderColor}` : "none"
//         },

//         [`& .${treeItemClasses.group}`]: {
//             marginLeft: 16,
//             paddingLeft: 18,
//             borderLeft: `1px dashed ${borderColor}`
//         }
//     };
// });


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
        borderLeft: `1px solid #cdcdcd`,
    },
}));
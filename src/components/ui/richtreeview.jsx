import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import TableViewIcon from '@mui/icons-material/TableView';

export default function RichObjectTreeView({ data, setFileSelected }) {
    const renderTree = (nodes) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={nodes.name}
            icon={nodes.type == 'file' ?
                <TableViewIcon sx={{ color: 'blue' }} /> :
                null
            }
        >
            {nodes.children.length > 0
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return (
        <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ minHeight: 300 }}
            onNodeSelect={(e, nodeId) =>
                setFileSelected(nodeId)
            }
        >
            {renderTree(data)}
        </TreeView>
    );
}
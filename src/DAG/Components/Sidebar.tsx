import React from 'react';

export default () => {
  // Which contains the varNode and funcNode box form the Left sideBar
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane</div>
      {/* <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Variable Node
      </div>
      <div className="dndnode function" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        function Node
      </div> */}
      {/* varNode box creation  */}
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'textUpdater')} draggable>
        Variable Node
      </div>
      {/* funcNode box creation  */}
      <div className="dndnode function" onDragStart={(event) => onDragStart(event, 'custom')} draggable>
        Function Node
      </div>

      {/* <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div> */}
    </aside>
  );
};

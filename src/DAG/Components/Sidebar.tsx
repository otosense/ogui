import React from 'react';
import { IDeleteAllEdgesNodes } from './Interfaces';

export default () => {
  // Which contains the varNode and funcNode box form the Left sideBar
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };


  return (
    <aside>
      <div className="description">You can drag these nodes to the pane</div>
      <div className="reactflow-sideBar">
        <div >
          {/* varNode box creation  */}
          <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'textUpdater')} draggable>
            Variable Node
          </div>
          {/* funcNode box creation  */}
          <div className="dndnode function" onDragStart={(event) => onDragStart(event, 'custom')} draggable>
            Function Node
          </div>

        </div>
      </div>

    </aside>
  );
};

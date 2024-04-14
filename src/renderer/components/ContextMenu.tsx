import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { useStyleStore } from '../store/StyleStore';

export default function ContextMenu({
   id,
   top,
   left,
   right,
   bottom,
   ...props
}) {
   const { getNode, getNodes, setNodes, addNodes, setEdges } = useReactFlow();

   const deleteNode = useCallback(() => {
      console.log(!getNode(id)!.type!.startsWith("_"))
      if (getNode(id)!.type!.startsWith("_")) {
         setNodes((nodes) => nodes.filter((node) => node.id !== id));
         setEdges((edges) => edges.filter((edge) => edge.source !== id));
      } else {
         useStyleStore.getState().setIsNodeToastError(true)
      }
   }, [id, setNodes, setEdges]);

   const node = getNode(id)
   const nodes = getNodes()

   const nodeIndex = nodes.indexOf(nodes.find(n => n.id == id))
   return (
      <div
         style={{ top, left, right, bottom }}
         className="context__menu"
         {...props}
      >
         <p style={{ margin: '0.5em' }}>
            <small>node: {node?.type}{nodeIndex}</small>
         </p>
         <button onClick={deleteNode}>delete</button>
      </div>
   );
}

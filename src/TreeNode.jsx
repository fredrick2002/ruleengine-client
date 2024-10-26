// src/TreeNode.jsx
import React from 'react';
import './TreeNode.css'; // Import CSS for styling

const TreeNode = ({ node }) => {
  const isOperator = node.type === 'operator';

  return (
    <div className="tree-node">
      <div className={`node ${isOperator ? 'operator' : 'operand'}`}>
        {node.value}
      </div>
      <div className="children">
        {node.left && <TreeNode node={node.left} />}
        {node.right && <TreeNode node={node.right} />}
      </div>
    </div>
  );
};

export default TreeNode;

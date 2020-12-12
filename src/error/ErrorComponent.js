import React from 'react';

export default function ErrorComponent(props) {
  return (
    <div className="error">
      <span>{props.message}</span>
      <button onClick={props.clearError}> X</button>
    </div>
  );
}

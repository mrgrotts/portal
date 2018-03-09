import React from 'react';

import classes from './DropArea.css';

let events = ['dragenter', 'dragover', 'dragleave', 'drop', 'ondragover', 'ondrop'];

const DropArea = props => {
  let dropArea = document.querySelector(classes.DropArea);

  events.forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  preventDefaults = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  // The dragged item is dragged over dropArea, making it the target for the drop event if the user drops it there.
  dropArea.addEventListener('dragenter', handlerFunction, false);
  // The dragged item is dragged off of dropArea and onto another element, making it the target for the drop event instead.
  dropArea.addEventListener('dragleave', handlerFunction, false);
  // Every few hundred milliseconds, while the dragged item is over dropArea and is moving.
  dropArea.addEventListener('dragover', handlerFunction, false);
  // The user releases their mouse button, dropping the dragged item onto dropArea.
  dropArea.addEventListener('drop', handlerFunction, false);

  return (
    <div id="drop-zone" className={classes.DropArea}>
      <p>Drag one or more files to this Drop Zone ...</p>
    </div>
  );
};

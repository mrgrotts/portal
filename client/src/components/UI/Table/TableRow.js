import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

import classes from './TableRow.css';

const TableRow = props => (
  <Auxiliary>
    <tr className={classes.TableRow} key={props._id}>
      {props.children}
    </tr>
  </Auxiliary>
);

export default TableRow;

import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

import classes from './TableItem.css';

const TableItem = props => (
  <Auxiliary>
    <td className={classes.TableItem}>{props.children}</td>
  </Auxiliary>
);

export default TableItem;

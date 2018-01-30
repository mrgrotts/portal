import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

import classes from './TableHeaderItem.css';

const TableHeaderItem = props => (
  <Auxiliary>
    <th className={classes.TableHeaderItem}>{props.children}</th>
  </Auxiliary>
);

export default TableHeaderItem;

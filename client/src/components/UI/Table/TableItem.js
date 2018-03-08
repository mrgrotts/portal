import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

import classes from './TableItem.css';

const TableItem = props => {
  let cell = null;
  if (props.TableItemStyle) {
    // console.log(props.TableItemStyle);
    let TableItemStyles = props.TableItemStyle.map(item => classes[item]).join(' ');
    // console.log(TableItemStyles);
    cell = (
      <Auxiliary>
        <td className={`${classes.TableItem} ${TableItemStyles}`}>{props.children}</td>
      </Auxiliary>
    );
  } else {
    cell = (
      <Auxiliary>
        <td className={classes.TableItem}>{props.children}</td>
      </Auxiliary>
    );
  }

  return cell;
};

export default TableItem;

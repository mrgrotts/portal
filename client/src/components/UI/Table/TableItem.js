import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

import classes from './TableItem.css';

const TableItem = props => {
  // console.log(props.TableItemStyle);
  let TableItemStyles = '';
  if (props.TableItemStyle) {
    TableItemStyles = props.TableItemStyle.map(item => classes[item]).join(' ');
  }
  // console.log(TableItemStyles);

  return (
    <Auxiliary>
      <td className={`${classes.TableItem} ${TableItemStyles}`}>
        {props.children}
      </td>
    </Auxiliary>
  );
};

export default TableItem;

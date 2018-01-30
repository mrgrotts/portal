import React from 'react';

import TableHeaderItem from './TableHeaderItem';

import classes from './Table.css';

const Table = props => {
  let headers = props.headers.map(header => {
    return <TableHeaderItem key={header}>{header}</TableHeaderItem>;
  });

  return (
    <table className={classes.Table}>
      <thead className={classes.TableHeaders}>
        <tr className={classes.TableHeadersRow}>{headers}</tr>
      </thead>
      <tbody className={classes.TableData}>{props.children}</tbody>
    </table>
  );
};

export default Table;

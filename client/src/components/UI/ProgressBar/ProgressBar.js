import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

import classes from './ProgressBar.css';

const ProgressBar = props => {
  let progress;

  switch (props.status) {
    case 'Unassigned':
      progress = (
        <Auxiliary>
          <li className={classes.ActiveYellow} />
          <li className={''} />
          <li className={''} />
          <li className={''} />
          <li className={''} />
        </Auxiliary>
      );
      break;
    case 'Pending':
      progress = (
        <Auxiliary>
          <li className={classes.VisitedYellow} />
          <li className={classes.ActiveOrange} />
          <li className={''} />
          <li className={''} />
          <li className={''} />
        </Auxiliary>
      );
      break;
    case 'Prep':
      progress = (
        <Auxiliary>
          <li className={classes.VisitedYellow} />
          <li className={classes.VisitedOrange} />
          <li className={classes.ActiveGreen} />
          <li className={''} />
          <li className={''} />
        </Auxiliary>
      );
      break;
    case 'In Progress':
      progress = (
        <Auxiliary>
          <li className={classes.VisitedYellow} />
          <li className={classes.VisitedOrange} />
          <li className={classes.VisitedGreen} />
          <li className={classes.ActiveRed} />
          <li className={''} />
        </Auxiliary>
      );
      break;
    case 'On Hold':
      progress = (
        <Auxiliary>
          <li className={classes.VisitedYellow} />
          <li className={classes.VisitedOrange} />
          <li className={classes.VisitedGreen} />
          <li className={classes.ActiveRed} />
          <li className={''} />
        </Auxiliary>
      );
      break;
    case 'Purchasing Parts':
      progress = (
        <Auxiliary>
          <li className={classes.VisitedYellow} />
          <li className={classes.VisitedOrange} />
          <li className={classes.VisitedGreen} />
          <li className={classes.ActiveRed} />
          <li className={''} />
        </Auxiliary>
      );
      break;
    case 'Ordered Parts':
      progress = (
        <Auxiliary>
          <li className={classes.VisitedYellow} />
          <li className={classes.VisitedOrange} />
          <li className={classes.VisitedGreen} />
          <li className={classes.ActiveRed} />
          <li className={''} />
        </Auxiliary>
      );
      break;
    case 'Closed':
      progress = (
        <Auxiliary>
          <li className={classes.VisitedYellow} />
          <li className={classes.VisitedOrange} />
          <li className={classes.VisitedGreen} />
          <li className={classes.VisitedRed} />
          <li className={classes.ActiveBlack} />
        </Auxiliary>
      );
      break;
    default:
      progress = (
        <Auxiliary>
          <li className={classes.ActiveYellow} />
          <li className={''} />
          <li className={''} />
          <li className={''} />
          <li className={''} />
        </Auxiliary>
      );
  }

  return (
    <div className={classes.ProgressWrap}>
      <ul className={classes.ProgressBar}>{progress}</ul>
    </div>
  );
};

export default ProgressBar;

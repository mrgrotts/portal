import React from "react";

import classes from "./ProgressBar.css";

const ProgressBar = props => {
  // switch (statusDiv) {
  //   case "Unassigned":
  //     pBarLi.eq(0).addClass("active-yellow");
  //     break;
  //   case "Pending":
  //     pBarLi.eq(0).addClass("visited-yellow");
  //     pBarLi.eq(1).addClass("active-orange");
  //     break;
  //   case "Prep":
  //     pBarLi.eq(0).addClass("visited-yellow");
  //     pBarLi.eq(1).addClass("visited-orange");
  //     pBarLi.eq(2).addClass("active-green");
  //     break;
  //   case "In Progress":
  //     pBarLi.eq(0).addClass("visited-yellow");
  //     pBarLi.eq(1).addClass("visited-orange");
  //     pBarLi.eq(2).addClass("visited-green");
  //     pBarLi.eq(3).addClass("active-red");
  //     break;
  //   case "Closed":
  //     pBarLi.eq(0).addClass("visited-yellow");
  //     pBarLi.eq(1).addClass("visited-orange");
  //     pBarLi.eq(2).addClass("visited-green");
  //     pBarLi.eq(3).addClass("visited-red");
  //     pBarLi.eq(4).addClass("active-black");
  //     break;
  // }

  return (
    <div className={classes.ProgressWrap}>
      <ul className={classes.ProgressBar}>
        <li className={classes.active} />
        <li className={""} />
        <li className={""} />
        <li className={""} />
        <li className={""} />
      </ul>
    </div>
  );
};

export default ProgressBar;

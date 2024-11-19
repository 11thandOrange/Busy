import { Link } from "@remix-run/react";
import React from "react";


const RouteTest = () => {
  return (
    <div>
      {" "}
      <Link to="/RouteTest/NestedRoute">
        Countdown Timer Customization
      </Link>{" "}
     
    </div>
  );
};

export default RouteTest;

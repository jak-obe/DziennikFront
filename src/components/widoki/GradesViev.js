import NavigationStudent from "../Navigation/NavigationStudent";
import React from "react";
import PlanLekcji from "../PlanLekcji/PlanLekcji";
import Grades from "../Grade/Grades";

const GradesViev = () => {
  return (
    <div>
      <NavigationStudent/>
        <Grades/>
    </div>
  );
};

export default GradesViev;
import NavigationStudent from "../Navigation/NavigationStudent";
import React from "react";
import PlanLekcji from "../PlanLekcji/PlanLekcji";
import ClassForm from "../Classes/ClassForm";

const PlanLekcjiViev = () => {
  return (
    <div>
      <NavigationStudent/>
        <PlanLekcji/>
    </div>
  );
};

export default PlanLekcjiViev;
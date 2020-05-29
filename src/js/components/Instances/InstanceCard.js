import React from "react";
import { Card } from "../common/Card";

export default function InstanceCard(props) {
  const instance = props.instance;
  const id = instance.id;
  const environment = instance.environment;

  return (
    <div className="col-md-12" style={{ paddingLeft: "0px" }}>
      <Card
        title={`${instance.application}:${
          instance.version ? instance.version : "Not deployed"
        }`}
        linkTo={`/instances/` + id}
        subtitle={environment}
      ></Card>
    </div>
  );
}

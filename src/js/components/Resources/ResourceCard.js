import React from "react";
import {
  getResourceTypeName /*, resourceTypeIcon*/,
} from "../../utils/resourceTypes";
import { styles } from "../../commonStyles/commonInlineStyles";
import { Card } from "../common/Card";

export default function ResourceCard(props) {
  const resource = props.resource;
  const title = `${getResourceTypeName(resource.type)} - ${resource.alias}`;
  const scope = Object.keys(resource.scope)
    .map((k) => `${resource.scope[k]}`)
    .join(" | ");

  return (
    <div className="col-md-10" style={{ paddingLeft: "0px" }}>
      <Card
        title={title}
        subtitle={scope}
        linkTo={`resources/${resource.id}`}
      ></Card>
    </div>
  );
}

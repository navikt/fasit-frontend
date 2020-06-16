import React from "react";
import moment from "moment";
import { Card } from "../common/Card";

import { styles } from "../../commonStyles/commonInlineStyles";

export function CurrentRevision(props) {
  moment.locale("en");
  const { revisions, revisionId } = props;
  const rev = revisions.data.filter((r) => r.revision == revisionId);

  if (!revisionId || rev.length === 0) {
    return null;
  }

  const currentRevision = rev[0];
  return (
    <div className="col-md-6" style={{ marginTop: "1rem", marginLeft: "1rem" }}>
      <Card
        title={`Revision ${currentRevision.revision} - ${
          currentRevision.revisiontype === "add" ? "Created" : "Modified"
        }`}
        subtitle={`${moment(currentRevision.timestamp).format(
          "DD.MM YYYY, HH:mm"
        )} by ${currentRevision.author}`}
        content={currentRevision.message}
      ></Card>
    </div>
  );
}

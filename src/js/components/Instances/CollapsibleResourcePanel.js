import React from "react";
import { Link } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { styles } from "../../commonStyles/commonInlineStyles";
import { capitalize } from "../../utils/";

export default function CollapsibleResourcePanel(props) {
  const { title, resourceList } = props;
  return (
    <ExpansionPanel disabled={resourceList.length == 0}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <b>{title}</b>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Type</th>
              <th>Alias</th>
            </tr>
          </thead>
          <tbody>
            {resourceList
              .sort((a, b) => a.type.localeCompare(b.type))
              .map((resource, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      {resource.deleted ? (
                        <div style={styles.red}>Deleted</div>
                      ) : (
                        capitalize(resource.type)
                      )}
                    </td>
                    <td>
                      {resource.deleted ? (
                        <div>{resource.alias}</div>
                      ) : (
                        <Link to={`/resources/${resource.id}`}>
                          {resource.alias}
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

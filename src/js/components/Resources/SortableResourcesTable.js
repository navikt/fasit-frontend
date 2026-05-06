import React, { useState } from "react";
import { Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import MuiTooltip from "@mui/material/Tooltip";
import moment from "moment";
import { Link } from "react-router-dom";
import { capitalize } from "../../utils/";
import { styles, icons } from "../../commonStyles/commonInlineStyles";

export default function SortableResourceTable(props) {
  const { resources, instanceLastChanged } = props;
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const tooltipText = `Resource was changed after appinstance was deployed - ${moment(instanceLastChanged).format("DD MMM YYYY HH:mm:ss")}`;

  function handleSortOrderChange(key) {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
  }

  function getSortedResources() {
    if (!sortKey) return resources;
    return [...resources].sort((a, b) => {
      let first = a[sortKey];
      let second = b[sortKey];

      if (typeof first === "string" && typeof second === "string") {
        first = first.toLowerCase();
        second = second.toLowerCase();
      }

      if (first === second) {
        return 0;
      }

      const result = first > second ? 1 : -1;
      return sortOrder === "desc" ? result * -1 : result;
    });
  }

  function renderLastChanged(lastchange) {
    if (lastchange) {
      moment.locale("en");
      const momentTime = moment(lastchange);
      return momentTime.format("DD MMM YYYY HH:mm:ss");
    }
    return "N/A";
  }

  const columns = [
    {
      key: "type",
      label: "Type",
      sortable: true,
      render: (type, resource) =>
        resource.deleted ? (
          <div style={styles.red}>Deleted</div>
        ) : (
          capitalize(type)
        )
    },
    {
      key: "alias",
      label: "Alias",
      sortable: true,
      render: (alias, resource) =>
        resource.deleted ? (
          <div>{alias}</div>
        ) : (
          <Link to={`/resources/${resource.id}?revision=${resource.revision}`}>
            {alias}
          </Link>
        )
    },
    {
      key: "lastchange",
      label: "Last change",
      sortable: true,
      render: lastchange => renderLastChanged(lastchange)
    },
    {
      key: "lastupdateby",
      label: "Changed by",
      sortable: true,
      render: lastupdateby => (lastupdateby ? <div>{lastupdateby}</div> : "N/A")
    },
    {
      key: "lastchange",
      label: "Status",
      sortable: false,
      style: { width: 100 },
      render: lastchange =>
        moment(lastchange).isAfter(moment(instanceLastChanged)) ? (
          <MuiTooltip title={tooltipText} placement="left">
            <div>{icons.warning}</div>
          </MuiTooltip>
        ) : (
          ""
        )
    }
  ];

  const sortedResources = getSortedResources();

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col, idx) => (
            <TableCell key={idx} style={col.style}>
              {col.sortable ? (
                <TableSortLabel
                  active={sortKey === col.key}
                  direction={sortKey === col.key ? sortOrder : "asc"}
                  onClick={() => handleSortOrderChange(col.key)}
                >
                  {col.label}
                </TableSortLabel>
              ) : (
                col.label
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedResources.map((resource, rowIdx) => (
          <TableRow key={rowIdx} hover style={styles.tableData}>
            {columns.map((col, colIdx) => (
              <TableCell key={colIdx} style={styles.tableData}>
                {col.render(resource[col.key], resource)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

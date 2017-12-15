import React from "react";
import DataTables from "material-ui-datatables";
import moment from "moment";
import { Link } from "react-router";
import { capitalize } from "../../utils/";
import { styles, icons } from "../../commonStyles/commonInlineStyles";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function SortableResourceTable(props) {
    const { resources, instanceLastChanged } = props

    const tooltip = (
        <Tooltip id="tooltip">
            Resource was changed after appinstance was deployed<br /> {moment(instanceLastChanged).format('DD MMM YYYY HH:mm:ss')}
        </Tooltip>)

    function onSortOrderChange(key, order) {
        return resources.sort((a, b) => {
            let first = a[key]
            let second = b[key]

            if (typeof first === 'string' && typeof second === 'string') {
                first = first.toLowerCase()
                second = second.toLowerCase()
            }

            if (first === second) {
                return 0
            }

            const result = first > second ? 1 : -1
            // for inverting search result when order is descending
            return order === 'desc' ? result * -1 : result
        })
    }

    function renderLastChanged(lastchange) {
        if (lastchange) {
            moment.locale("en")
            const momentTime = moment(lastchange)
            return momentTime.format('DD MMM YYYY HH:mm:ss')
        }
        return "N/A"
    }

    const columns = [
        {
            key: 'type',
            label: "Type",
            sortable: true,
            render: (type, resource) => resource.deleted ? <div style={styles.red}>Deleted</div> : capitalize(type)
        },
        {
            key: 'alias',
            label: "Alias",
            sortable: true,
            render: (alias, resource) => resource.deleted ? <div>{alias}</div> : <Link
                to={`/resources/${resource.id}?revision=${resource.revision}`}>{alias}</Link>
        },
        {
            key: 'lastchange',
            label: "Last change",
            sortable: true,
            render: (lastchange) => renderLastChanged(lastchange)
        },
        {
            key: 'lastupdateby',
            label: "Changed by",
            sortable: true,
            render: (lastupdateby) => lastupdateby ? <div>{lastupdateby}</div> : "N/A"
        },
        {
            key: 'lastchange',
            label: "Status",
            style: { width: 100 },
            render: (lastchange) => moment(lastchange).isAfter(moment(instanceLastChanged)) ? <OverlayTrigger placement="left" overlay={tooltip}><div>{icons.warning}</div></OverlayTrigger> : ""
        }

    ]
    return (
        <DataTables
            height='auto'
            selectable={true}
            showRowHover={true}
            columns={columns}
            tableRowColumnStyle={styles.tableData}
            tableRowStyle={styles.tableData}
            data={resources}
            showFooterToolbar={false}
            onSortOrderChange={onSortOrderChange}
        />)
}
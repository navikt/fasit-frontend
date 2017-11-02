import React from "react";
import DataTables from "material-ui-datatables";
import moment from "moment";
import { Link } from "react-router";
import { capitalize } from "../../utils/";
import { styles } from "../../commonStyles/commonInlineStyles";

export default function SortableResourceTable(props) {
    const resources = props.resources

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
            return (
                <div>
                    {momentTime.format('DD MMM YYYY')}
                    <i className="fa fa-clock-o fa-fw" />{momentTime.format('HH:mm:ss')}
                </div>
            )
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
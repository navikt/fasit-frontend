import React from "react";
import DataTables from "material-ui-datatables";
import moment from "moment";
import {Link} from "react-router";
import {capitalize} from "../../utils/";
import {styles} from "../../commonStyles/commonInlineStyles";
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

    const columns = [
        {
            key: 'type',
            label: "Type",
            sortable: true,
            render: (type) => capitalize(type)
        },
        {
            key: 'alias',
            label: "Alias",
            sortable: true,
            render: (alias, resource) => <Link
                to={`/resources/${resource.id}?revision=${resource.revision}`}>{alias}</Link>
        },
        {
            key: 'lastchange',
            label: "Last change",
            sortable: true,
            render: (lastchange, resource) => `${moment(lastchange).fromNow()} (${resource.lastupdateby})`
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
            onSortOrderChange={onSortOrderChange }
        />)
}
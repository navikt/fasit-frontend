import React from "react";
import { Link } from "react-router";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import { sortBy } from "../../utils/";


export function ResourceInstances(props) {
    return (
        <div>
            <h3>Used by</h3>
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Environment</TableHeaderColumn>
                        <TableHeaderColumn>Instance</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                {props.instances && <TableBody displayRowCheckbox={false}>
                    {props.instances
                        .sort(sortBy("application"))
                        .map(instance => {
                            return (
                                <TableRow key={instance.id}>
                                    <TableRowColumn><Link
                                        to={'/environments/' + instance.environment}>{instance.environment}</Link></TableRowColumn>
                                    <TableRowColumn><Link
                                        to={'/instances/' + instance.id}>{instance.application + ":" + instance.version}</Link></TableRowColumn>
                                </TableRow>
                            )
                        })}
                </TableBody>}
            </Table>
        </div>
    )
}
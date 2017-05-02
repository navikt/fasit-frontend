import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import Paper from 'material-ui/Paper'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'


export function ResourceInstances(props) {
    return (
            <div style={{paddingTop: 30 + "px"}}>
                <h3>Used by</h3>
                <Paper zDepth={2} style={{paddingLeft: 10 + "px", paddingTop: 10 + "px"} }>
                    <div>

                        <Table>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>Environment</TableHeaderColumn>
                                    <TableHeaderColumn>Instance</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {props.instances.map(instance => {
                                    return (
                                        <TableRow key={instance.id}>
                                            <TableRowColumn><Link
                                                to={'/environments/' + instance.environment}>{instance.environment}</Link></TableRowColumn>
                                            <TableRowColumn><Link
                                                to={'/instances/' + instance.id}>{instance.application + ":" + instance.version}</Link></TableRowColumn>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </div>
    )
}
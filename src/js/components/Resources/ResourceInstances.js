import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import { sortBy } from "../../utils/";


export function ResourceInstances(props) {
    return (
        <div>
            <h3>Used by</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Environment</TableCell>
                        <TableCell>Instance</TableCell>
                    </TableRow>
                </TableHead>
                {props.instances && <TableBody>
                    {props.instances
                        .sort(sortBy("application"))
                        .map(instance => {
                            return (
                                <TableRow key={instance.id}>
                                    <TableCell><Link
                                        to={'/environments/' + instance.environment}>{instance.environment}</Link></TableCell>
                                    <TableCell><Link
                                        to={'/instances/' + instance.id}>{instance.application + ":" + instance.version}</Link></TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>}
            </Table>
        </div>
    )
}
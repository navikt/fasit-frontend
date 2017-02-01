import React from 'react'
import {Link} from 'react-router'

export default ({items}) => {

    if (!items) {
        return (<div />)
    }

    return (
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Alias</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {items.map(resource => {
                    return <tr key={resource.id}>
                        <td><Link to={`/resources/${resource.id}?revision=${resource.revision}`}>{resource.alias}</Link>
                        </td>
                        <td>{resource.type}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    )
}
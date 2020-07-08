import React from "react"
import { Card } from "../common/Card"
import { Link } from "react-router-dom"

export default function InstancesCard(props) {
  const instances = props.instances

  if (!instances) {
    return null
  }

  return (
    <Card title="Application instances">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Instance</th>
            <th>Environment</th>
          </tr>
        </thead>
        <tbody>
          {instances
            .sort((a, b) => a.environment.localeCompare(b.environment))
            .map((instance, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <Link to={`/instances/${instance.id}`}>{`${
                      instance.application
                    }:${
                      instance.version ? instance.version : "Not deployed"
                    }`}</Link>
                  </td>
                  <td>
                    <Link to={`/environments/${instance.environment}`}>
                      {instance.environment}
                    </Link>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </Card>
  )
}

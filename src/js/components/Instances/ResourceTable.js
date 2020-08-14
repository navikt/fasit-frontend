import React from "react"
import { Link } from "react-router-dom"
import { styles } from "../../commonStyles/commonInlineStyles"
import { capitalize } from "../../utils"

export default function ResourceTab(props) {
  const { resources } = props

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Type</th>
          <th>Alias</th>
        </tr>
      </thead>
      <tbody>
        {resources
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
            )
          })}
      </tbody>
    </table>
  )
}

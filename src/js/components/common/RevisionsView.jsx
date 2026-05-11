import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import { connect } from "react-redux"
import history from "../../history"
import { List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import { fetchRevisions } from "../../actionCreators/common"
import { styles, icons } from "../../commonStyles/commonInlineStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spinner } from "."

function RevisionsView({ dispatch, id, component, revisions, routing, currentRevision }) {
  const [displayAllRevisions, setDisplayAllRevisions] = useState(false)

  useEffect(() => {
    dispatch(fetchRevisions(component, id))
  }, [id])

  const showRevisionsFooter = () => {
    if (revisions.data.length > 5 && !displayAllRevisions) {
      return (
        <div className="information-box-footer">
          <a
            className="text-right arrow cursor-pointer"
            onClick={() => setDisplayAllRevisions(true)}
          >
            Show all ({revisions.data.length}){" "}
            <FontAwesomeIcon icon="angle-double-down" />
          </a>
        </div>
      )
    }
    if (revisions.data.length > 5 && displayAllRevisions) {
      return (
        <div className="information-box-footer">
          <a
            className="text-right arrow cursor-pointer"
            onClick={() => setDisplayAllRevisions(false)}
          >
            Show less <FontAwesomeIcon icon="angle-double-up" />
          </a>
        </div>
      )
    }
  }

  if (revisions.isFetching) {
    return <Spinner />
  } else if (revisions.requestFailed)
    return <div key="1">Unable to fetch revisions</div>

  let displayRevisions = revisions.data

  if (!displayAllRevisions)
    displayRevisions = revisions.data.slice(0, 5)
  return (
      <List style={{ paddingTop: "0px", padding: "0px" }}>
        {displayRevisions.map((rev, idx) => {
          const revisionQuery = `?revision=${rev.revision}`
          return (
            <ListItemButton
              key={idx}
              onClick={() =>
                history.push(routing.pathname + revisionQuery)
              }
              style={{ fontSize: "14px" }}
            >
              {rev.revision == currentRevision && <ListItemIcon>{icons.rightArrow}</ListItemIcon>}
              <ListItemText
                primary={dayjs(rev.timestamp).format("DD MMM YYYY HH:mm:ss")}
                secondary={renderSecondaryText(rev)}
              />
            </ListItemButton>
          )
        })}

        {showRevisionsFooter()}
      </List>
  )
}

function renderSecondaryText(revision) {
  return (
    <span>
      {revision.author}
      {revision.message && (
        <span>
          {" "}
          <FontAwesomeIcon icon="angle-double-right" fixedWidth />
          {revision.message}
        </span>
      )}
    </span>
  )
}

const mapStateToProps = state => ({
  revisions: state.revisions,
  routing: state.router.location
})

export default connect(mapStateToProps)(RevisionsView)

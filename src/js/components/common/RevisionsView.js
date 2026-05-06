import React, { Component } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { connect } from "react-redux"
import history from "../../history"
import { List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import { fetchRevisions } from "../../actionCreators/common"
import { styles, icons } from "../../commonStyles/commonInlineStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spinner } from "."

class RevisionsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayAllRevisions: false
    }
  }

  componentDidMount() {
    const { dispatch, id, component } = this.props
    dispatch(fetchRevisions(component, id))
  }

  componentDidUpdate(prevProps) {
    const { dispatch, id, component } = this.props

    if (prevProps.id !== id) {
      dispatch(fetchRevisions(component, id))
    }
  }

  showRevisionsFooter() {
    const { revisions } = this.props
    if (revisions.data.length > 5 && !this.state.displayAllRevisions) {
      return (
        <div className="information-box-footer">
          <a
            className="text-right arrow cursor-pointer"
            onClick={() => this.setState({ displayAllRevisions: true })}
          >
            Show all ({revisions.data.length}){" "}
            <FontAwesomeIcon icon="angle-double-down" />
          </a>
        </div>
      )
    }
    if (revisions.data.length > 5 && this.state.displayAllRevisions) {
      return (
        <div className="information-box-footer">
          <a
            className="text-right arrow cursor-pointer"
            onClick={() => this.setState({ displayAllRevisions: false })}
          >
            Show less <FontAwesomeIcon icon="angle-double-up" />
          </a>
        </div>
      )
    }
  }

  render() {
    moment.locale("en")
    const { dispatch, revisions, routing, currentRevision } = this.props

    if (revisions.isFetching) {
      return <Spinner />
    } else if (revisions.requestFailed)
      return <div key="1">Unable to fetch revisions</div>

    let displayRevisions = revisions.data

    if (!this.state.displayAllRevisions)
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
                  primary={moment(rev.timestamp).format("DD MMM YYYY HH:mm:ss")}
                  secondary={renderSecondaryText(rev)}
                />
              </ListItemButton>
            )
          })}

          {this.showRevisionsFooter()}
        </List>
    )
  }
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

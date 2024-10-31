import React, { Component } from "react"
import { browserHistory } from "react-router"
import moment from "moment"
import { connect } from "react-redux"
import { List, ListItem } from "material-ui/List"
import { fetchRevisions } from "../../actionCreators/common"
import { icons } from "../../commonStyles/commonInlineStyles"
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

  componentWillReceiveProps(nextProps) {
    const { dispatch, id, component } = nextProps

    if (this.props.id !== nextProps.id) {
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
    const { revisions, routing, currentRevision } = this.props

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
              <ListItem
                key={idx}
                onClick={() =>
                  browserHistory.push(routing.pathname + revisionQuery)
                }
                style={{ fontSize: "14px" }}
                leftIcon={
                  rev.revision == currentRevision ? icons.rightArrow : null
                }
                insetChildren={true}
                innerDivStyle={{ paddingBottom: "5px", paddingTop: "5px" }}
                disableTouchRipple={true}
                primaryText={moment(rev.timestamp).format("DD MMM YYYY HH:mm:ss")}
                secondaryText={renderSecondaryText(rev)}
                secondaryTextLines={rev.message ? 2 : 1}
              />
            )
          })}

          {this.showRevisionsFooter()}
        </List>
    )
  }
}

function renderSecondaryText(revision) {
  return (
    <div>
      {revision.author}
      {revision.message && (
        <div>
          {" "}
          <FontAwesomeIcon icon="angle-double-right" fixedWidth />
          {revision.message}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  revisions: state.revisions,
  routing: state.routing.locationBeforeTransitions
})

export default connect(mapStateToProps)(RevisionsView)

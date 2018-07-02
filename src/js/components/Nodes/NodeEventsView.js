import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { fetchEvents } from "../../actionCreators/node"
import { Spinner } from "../common"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class NodeEventsView extends Component {
  constructor(props) {
    super(props)
  }

  // Trenger sende hele fasitdata til actionCreator for å bygge URL basert på cluster, environment og hostname
  componentDidMount() {
    const { fasit, dispatch } = this.props
    dispatch(fetchEvents(fasit.data))
  }

  showEvents() {
    const { events, fasit } = this.props

    if (events.isFetching || fasit.isFetching) return <Spinner />
    else if (events.requestFailed)
      return (
        <div>
          Retrieving events failed:
          <br />
          <br />
          <pre>
            <i>No events found.</i>
          </pre>
        </div>
      )

    {
      return this.generateEvent(events.data)
    }
  }

  generateEvent(events) {
    return events.map((event, index) => {
      if (event.check.handlers) {
        if (event.check.handlers[0] === "default") {
          return (
            <div key={index} className="information-box-content">
              {this.getStatusIcon(event.check.status)}&nbsp;&nbsp;&nbsp;&nbsp;
              {event.check.name
                .split("_")
                .splice(1)
                .join(" ")}
            </div>
          )
        }
      }
    })
  }

  getStatusIcon(status) {
    switch (status) {
      case 0:
        return <FontAwesomeIcon icon="check" className="event-ok" />
      case 1:
        return <FontAwesomeIcon icon="exclamation" className="event-warning" />
      case 2:
        return (
          <FontAwesomeIcon
            icon="exclamation-triangle"
            className="event-error"
          />
        )
      default:
        return <FontAwesomeIcon icon="question" />
    }
  }

  render() {
    return (
      <div className="collapsible-menu-content-container">
        {this.showEvents()}
      </div>
    )
  }
}

Node.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    events: state.node_events,
    fasit: state.node_fasit
  }
}

export default connect(mapStateToProps)(NodeEventsView)

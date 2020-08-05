import React, { Component } from "react"
import { connect } from "react-redux"
import browserHistory from "../../utils/browserHistory"
import { Card } from "../common/Card"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import {
  APPCONFIG,
  CLUSTER,
  destinationUrl,
  INSTANCE,
  RESOURCE,
} from "../Search/searchResultTypes"
import { styles } from "../../commonStyles/commonInlineStyles"
import { capitalize } from "../../utils/"
import { getResourceTypeName } from "../../utils/resourceTypes"
import { setSearchString, submitSearch } from "../../actionCreators/common"
import { getQueryParam } from "../../utils"

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch, location, match } = this.props
    if (match.params.query) {
      dispatch(setSearchString(match.params.query))
      dispatch(
        submitSearch(match.params.query, getQueryParam(location.search, "type"))
      )
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, match } = this.props

    if (
      nextProps.match.params.query &&
      match.params.query != nextProps.match.params.query
    ) {
      dispatch(submitSearch(nextProps.match.params.query))
    }
  }

  searchResultCard(searchResult, idx) {
    let title = searchResult.name
    let subtitle = capitalize(searchResult.type)

    const detailedInfo = searchResult.detailedinfo

    switch (searchResult.type) {
      case RESOURCE:
        title = `${getResourceTypeName(detailedInfo.type)} ${searchResult.name}`
        subtitle = `${subtitle} ${searchResult.detailedinfo.scope}`
        break
      case CLUSTER:
        subtitle = searchResult.info
        break
      case INSTANCE:
      case APPCONFIG:
        subtitle = capitalize(searchResult.detailedinfo.environment)
        break
    }

    return (
      <div style={styles.paddingTop5} key={idx}>
        <Card
          title={title}
          linkTo={destinationUrl(searchResult)}
          subtitle={subtitle}
        ></Card>
      </div>
    )
  }

  filterByType(type) {
    const { searchQuery, dispatch } = this.props
    dispatch(submitSearch(searchQuery, type))
    const newPath = type
      ? `/search/${searchQuery}?type=${type}`
      : `/search/${searchQuery}`
    browserHistory.push(newPath)
  }

  filterButton(label, activeFilter) {
    return (
      <Button
        onClick={() => this.filterByType(label)}
        color={activeFilter === label ? "secondary" : "primary"}
      >
        {label}
      </Button>
    )
  }

  resultTypeFilters() {
    const { searchResults } = this.props
    const activeFilter = searchResults.filter

    return (
      <React.Fragment>
        <div style={{ fontWeight: "bold" }}>Filters</div>
        <ButtonGroup variant="outlined">
          {this.filterButton("appconfig", activeFilter)}
          {this.filterButton("application", activeFilter)}
          {this.filterButton("cluster", activeFilter)}
          {this.filterButton("environment", activeFilter)}
          {this.filterButton("instance", activeFilter)}
          {this.filterButton("node", activeFilter)}
          {this.filterButton("resource", activeFilter)}
          <Button onClick={() => this.filterByType()}>Clear</Button>
        </ButtonGroup>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="main-content-container">
        {this.resultTypeFilters()}
        <div className="row">
          <div className="col-sm-10">
            {this.props.searchResults.data.map((sr, idx) =>
              this.searchResultCard(sr, idx)
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.search,
    searchQuery: state.navsearch.query,
  }
}

export default connect(mapStateToProps)(Search)

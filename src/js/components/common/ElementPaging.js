import React, { useState, useEffect, useRef } from "react"
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { submitFilterString } from "../../actionCreators/element_lists"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function ElementPaging(props) {
  const { dispatch, filter } = props
  const [page, setPage] = useState(0)
  const prevFiltersRef = useRef(filter.filters)

  useEffect(() => {
    if (prevFiltersRef.current !== filter.filters) {
      setPage(0)
      prevFiltersRef.current = filter.filters
    }
  })

  const changePage = (changeTo, lastPage) => {
    switch (changeTo) {
      case "first":
        setPage(0)
        dispatch(submitFilterString(filter.context, 0))
        break
      case "last":
        setPage(lastPage)
        dispatch(submitFilterString(filter.context, lastPage))
        break
      case "next":
        if (page < lastPage) {
          setPage(page + 1)
          dispatch(submitFilterString(filter.context, page + 1))
        }
        break
      case "prev":
        if (page > 0) {
          setPage(page - 1)
          dispatch(submitFilterString(filter.context, page - 1))
        }
        break
    }
  }

  const contextData = props[filter.context]
  if (!contextData || !contextData.headers) return null
  const total_count = contextData.headers.total_count
  const lastPage = calculateLastPage(total_count)
  return (
    <div className="element-list-paging">
      <div className="btn-group btn-group-justified">
        <a
          className="btn btn-link"
          id="first"
          onClick={() => changePage("first", lastPage)}
          
        >
          <FontAwesomeIcon icon="angle-double-left" aria-hidden="true" />
        </a>
        <a
          className="btn btn-link "
          id="prev"
          onClick={() => changePage("prev", lastPage)}
        >
          <FontAwesomeIcon icon="angle-left" aria-hidden="true" />
        </a>
        <div className="element-list-paging-number">
          {page + 1} / {lastPage + 1}
        </div>
        <a
          className="btn btn-link"
          id="next"
          onClick={() => changePage("next", lastPage)}
        >
          <FontAwesomeIcon icon="angle-right" aria-hidden="true" />
        </a>
        <a
          className="btn btn-link "
          id="last"
          onClick={() => changePage("last", lastPage)}
        >
          <FontAwesomeIcon icon="angle-double-right" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

const calculateLastPage = totalCount => {
  const PER_PAGE = 50
  if (!totalCount) {
    return "?"
  } else if (totalCount <= PER_PAGE) {
    return 0
  } else {
    return Math.ceil(totalCount / PER_PAGE)
  }
}

const mapStateToProps = state => {
  return {
    filter: state.filter,
    nodes: state.nodes,
    resources: state.resources,
    environments: state.environments,
    applications: state.applications,
    instances: state.instances
  }
}

export default connect(mapStateToProps)(ElementPaging)

import React, { Component } from "react"
import history from "../../utils/browserHistory"
import { connect } from "react-redux"
import { submitNavSearch } from "../../actionCreators/common"
import { destinationUrl } from "../Search/searchResultTypes"
import { capitalize } from "../../utils/"
import {
  changeFilter,
  submitFilterString,
} from "../../actionCreators/element_lists"

class NavSearch extends Component {
  constructor(props) {
    super(props)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)

    this.state = {
      selectedOption: null,
      visible: false,
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
    this.navSearch.focus()
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  handleMouseOver(navItem) {
    const { navSearch } = this.props
    const options = [...new Set(navSearch.data.map((result) => result.id))]
    const mouseOverItem = options.indexOf(navItem.id)
    this.setState({ selectedOption: mouseOverItem })
  }

  handleMouseClick(e) {
    e.preventDefault()
    this.navigate()
  }

  handleKeyDown(e) {
    const { location } = this.props
    switch (e.key) {
      case "ArrowRight":
      case "ArrowLeft":
        break // avoid visibility changing when moving sideways
      case "Escape": // esc
        e.preventDefault()
        this.setState({ visible: false })
        break
      case "ArrowUp": // up
        e.preventDefault()
        this.setState({ visible: true })
        this.changeSelectedOption("prev")
        break
      case "ArrowDown": // down
        e.preventDefault()
        this.setState({ visible: true })
        this.changeSelectedOption("next")
        break
      case "Enter": // enter
        this.navSearch.blur()
        e.preventDefault()
        this.navigate()
        break
      default:
        // reset selectedOption and display dropdown if query changes
        this.setState({ selectedOption: null, visible: true })
        if (location.pathname === "/") {
          history.push("/search")
        }
    }
  }

  navigate() {
    const { dispatch, navSearch, location } = this.props
    const navItem = navSearch.data[this.state.selectedOption]

    if (!navItem) {
      if (!(location.pathname === "/search")) {
        history.push("/search")
      }
      history.push(`search/${navSearch.query}`)
      this.setState({ visible: false })
    } else if (navItem.type === "Quick navigation") {
      dispatch(submitNavSearch(""))
      dispatch(changeFilter("alias", navSearch.query))
      dispatch(submitFilterString("resources", 0))
      history.push(`/resources?alias=${navSearch.query}`)
    } else {
      dispatch(submitNavSearch(""))
      history.push(destinationUrl(navItem))
    }
  }

  changeSelectedOption(dir) {
    const { selectedOption } = this.state
    const { navSearch } = this.props
    const options = [...new Set(navSearch.data.map((result) => result.id))]
    switch (dir) {
      case "prev":
        if (selectedOption === null || selectedOption === 0) {
          this.setState({ selectedOption: options.length - 1 })
        } else {
          this.setState({ selectedOption: selectedOption - 1 })
        }
        break

      case "next":
        if (selectedOption === null || selectedOption + 1 === options.length) {
          this.setState({ selectedOption: 0 })
        } else {
          this.setState({ selectedOption: selectedOption + 1 })
        }
        break
    }
  }

  /* Setting wrapper ref to handle mouse click outside component. This is to hide dropdown when clicking outside*/
  setWrapperRef(node) {
    this.wrapperRef = node
  }

  /* Setting wrapper ref to handle mouse click outside component. This is to hide dropdown when clicking outside*/
  handleClickOutside(event) {
    if (
      this.state.visible &&
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target)
    ) {
      this.setState({ visible: false })
    }
  }

  render() {
    const { dispatch, navSearch } = this.props
    const { visible, selectedOption } = this.state
    const { query, data, isFetching, searchResultTypes } = navSearch
    const options = [...new Set(data.map((item) => item.id))]

    return (
      <div
        onKeyDown={(e) => this.handleKeyDown(e)}
        className="navSearchContainer"
      >
        <form className="navSearchForm">
          <input
            type="text"
            className="navSearchTextInput"
            ref={(input) => (this.navSearch = input)}
            placeholder={"Search"}
            value={query}
            onChange={(e) => dispatch(submitNavSearch(e.target.value))}
          />
          <button
            type="submit"
            className="navSearchButton"
            onClick={(e) => {
              e.preventDefault()
              this.navigate()
            }}
          >
            Go
          </button>
        </form>
        {query && visible ? (
          isFetching ? (
            <div
              className="navSearchDropdown loadingDots"
              ref={this.setWrapperRef}
            />
          ) : (
            <div className="navSearchDropdown" ref={this.setWrapperRef}>
              {data.length > 0
                ? searchResultTypes.map((type, i) => {
                    // Returnerer en blokk for hver elementtype
                    return (
                      <div key={i}>
                        <small>
                          {capitalize(type)}
                          {data.filter(
                            (itemsByType) => itemsByType.type === type
                          ).length > 1
                            ? "s"
                            : null}
                          :
                        </small>
                        <div>
                          {data
                            .filter((itemsByType) => itemsByType.type === type) // filtrerer ut resultater per type
                            .map((navItem, i) => {
                              // returnerer en lenke til resultatet
                              const active =
                                navItem.id === options[selectedOption]
                              return (
                                <div
                                  key={i}
                                  onMouseEnter={() =>
                                    this.handleMouseOver(navItem)
                                  }
                                  onClick={(e) => this.handleMouseClick(e)}
                                  className={
                                    active
                                      ? "navOption selectedNavOption row"
                                      : "navOption row"
                                  }
                                  style={{ marginLeft: -10, marginRight: -20 }}
                                >
                                  <div className="col-md-5 text-overflow">
                                    {navItem.name}
                                  </div>
                                  <div className="col-md-6 text-overflow">
                                    <small
                                      style={
                                        active
                                          ? { color: "#f5f5f5" }
                                          : { color: "#777" }
                                      }
                                    >
                                      {navItem.info}
                                    </small>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    )
                  })
                : "No results found"}
            </div>
          )
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    navSearch: state.navsearch,
  }
}

export default connect(mapStateToProps)(NavSearch)

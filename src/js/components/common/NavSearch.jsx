import React, { useState, useEffect, useRef } from "react"
import history from "../../history"
import { connect } from "react-redux"
import Mousetrap from "mousetrap"
import { submitNavSearch } from "../../actionCreators/common"
import { destinationUrl } from "../Search/searchResultTypes"
import { capitalize } from "../../utils/index"
import {
  changeFilter,
  submitFilterString
} from "../../actionCreators/element_lists"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function NavSearch({ dispatch, navSearch, location }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [visible, setVisible] = useState(false)
  const wrapperRef = useRef(null)
  const navSearchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        visible &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    if (navSearchRef.current) {
      navSearchRef.current.focus()
    }
    Mousetrap.bind("g g", e => {
      e.preventDefault()
      if (navSearchRef.current) {
        navSearchRef.current.focus()
      }
    })

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      Mousetrap.unbind("g g")
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update click-outside handler when visible changes
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        visible &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [visible])

  const handleMouseOver = (navItem) => {
    const options = [...new Set(navSearch.data.map(result => result.id))]
    const mouseOverItem = options.indexOf(navItem.id)
    setSelectedOption(mouseOverItem)
  }

  const handleMouseClick = (e) => {
    e.preventDefault()
    navigate()
  }

  const navigate = () => {
    const navItem = navSearch.data[selectedOption]

    if (!navItem) {
      if (!(location.pathname === "/search")) {
        history.push("/search")
      }
      history.push(`/search/${navSearch.query}`)
      setVisible(false)
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

  const changeSelectedOption = (dir) => {
    const options = [...new Set(navSearch.data.map(result => result.id))]
    switch (dir) {
      case "prev":
        if (selectedOption === null || selectedOption === 0) {
          setSelectedOption(options.length - 1)
        } else {
          setSelectedOption(selectedOption - 1)
        }
        break

      case "next":
        if (selectedOption === null || selectedOption + 1 === options.length) {
          setSelectedOption(0)
        } else {
          setSelectedOption(selectedOption + 1)
        }
        break
    }
  }

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowLeft":
        break
      case "Escape":
        e.preventDefault()
        setVisible(false)
        break
      case "ArrowUp":
        e.preventDefault()
        setVisible(true)
        changeSelectedOption("prev")
        break
      case "ArrowDown":
        e.preventDefault()
        setVisible(true)
        changeSelectedOption("next")
        break
      case "Enter":
        if (navSearchRef.current) {
          navSearchRef.current.blur()
        }
        e.preventDefault()
        navigate()
        break
      default:
        setSelectedOption(null)
        setVisible(true)
        if (location.pathname === "/") {
          history.push("/search")
        }
    }
  }

  const { query, data, isFetching, searchResultTypes } = navSearch
  const options = [...new Set(data.map(item => item.id))]

  return (
    <div
      onKeyDown={e => handleKeyDown(e)}
      className="navSearchContainer"
    >
      <form className="navSearchForm">
        <input
          type="text"
          className="navSearchTextInput"
          ref={navSearchRef}
          placeholder={"Search"}
          value={query}
          onChange={e => dispatch(submitNavSearch(e.target.value))}
        />
        <button
          type="submit"
          className="navSearchButton"
          onClick={e => {
            e.preventDefault()
            navigate()
          }}
        >
          <FontAwesomeIcon icon="search" />
        </button>
      </form>
      {query && visible ? (
        isFetching ? (
          <div
            className="navSearchDropdown loadingDots"
            ref={wrapperRef}
          />
        ) : (
          <div className="navSearchDropdown" ref={wrapperRef}>
            {data.length > 0
              ? searchResultTypes.map((type, i) => {
                  return (
                    <div key={i}>
                      <b>
                        <i>
                          <small>
                            {capitalize(type)}
                            {data.filter(
                              itemsByType => itemsByType.type === type
                            ).length > 1
                              ? "s"
                              : null}:
                          </small>
                        </i>
                      </b>

                      <div>
                        {data
                          .filter(itemsByType => itemsByType.type === type)
                          .map((navItem, i) => {
                            const active =
                              navItem.id === options[selectedOption]
                            return (
                              <div
                                key={i}
                                onMouseEnter={() =>
                                  handleMouseOver(navItem)
                                }
                                onClick={e => handleMouseClick(e)}
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

const mapStateToProps = state => {
  return {
    location: state.router.location,
    navSearch: state.navsearch
  }
}

export default connect(mapStateToProps)(NavSearch)

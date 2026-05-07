import React, { useEffect, useRef } from "react"
import { connect } from "react-redux"
import history from "../../history"
import Mousetrap from "mousetrap"
import {
  fetchEnvironments,
  fetchApplicationNames,
  fetchResourceTypes,
  fetchNodeTypes
} from "../../actionCreators/fasit_initialize_data"
import { displayModal, toggleHelp } from "../../actionCreators/common"
import { displayLogin, logOut } from "../../actionCreators/authentication"
import TopNav from "../Navigation/TopNav"
import NewNodeForm from "../Nodes/NewNodeForm"
import NewApplicationForm from "../Applications/NewApplicationForm"
import NewEnvironmentForm from "../Environments/NewEnvironmentForm"
import NewClusterForm from "../Environments/NewClusterForm"
import NewResourceForm from "../Resources/NewResourceForm"
import { SubmitFormStatus, KeyboardShortcuts, ErrorDialog } from "../common/"
import { ThemeProvider, createTheme } from "@mui/material/styles"
const theme = createTheme({
  typography: {
    fontSize: 16,
  },
})
import buildFontAwesomeLibrary from "../../commonStyles/FontAwesomeIcons"

buildFontAwesomeLibrary()

function App({ dispatch, user, children }) {
  const prevUserRef = useRef(user)

  const protectedShortcuts = () => {
    Mousetrap.bind("n r", e => {
      e.preventDefault()
      dispatch(displayModal("resource", true))
    })
    Mousetrap.bind("n a", e => {
      e.preventDefault()
      dispatch(displayModal("application", true))
    })
    Mousetrap.bind("n e", e => {
      e.preventDefault()
      dispatch(displayModal("environment", true, "new"))
    })
    Mousetrap.bind("n c", e => {
      e.preventDefault()
      dispatch(displayModal("cluster", true))
    })
    Mousetrap.bind("n n", e => {
      e.preventDefault()
      dispatch(displayModal("node", true))
    })
  }

  const unbindShortcuts = () => {
    Mousetrap.unbind(["n r", "n a", "n e", "n c", "n n"])
  }

  useEffect(() => {
    // pre-load fasit data
    dispatch(fetchEnvironments())
    dispatch(fetchApplicationNames())
    dispatch(fetchResourceTypes())
    dispatch(fetchNodeTypes())
    // Global keyboard shortcuts
    Mousetrap.bind("q", e => {
      e.preventDefault()
      dispatch(toggleHelp())
    })
    Mousetrap.bind("l i", e => {
      e.preventDefault()
      dispatch(displayLogin(true))
    })
    Mousetrap.bind("l o", e => {
      e.preventDefault()
      dispatch(logOut())
    })
    Mousetrap.bind("g e", e => {
      e.preventDefault()
      history.push("/environments")
    })
    Mousetrap.bind("g a", e => {
      e.preventDefault()
      history.push("/applications")
    })
    Mousetrap.bind("g i", e => {
      e.preventDefault()
      history.push("/instances")
    })
    Mousetrap.bind("g r", e => {
      e.preventDefault()
      history.push("/resources")
    })
    Mousetrap.bind("g n", e => {
      e.preventDefault()
      history.push("/nodes")
    })
  }, [])

  useEffect(() => {
    const prevUser = prevUserRef.current
    if (user.authenticated && !prevUser.authenticated) {
      protectedShortcuts()
    } else if (!user.authenticated && prevUser.authenticated) {
      unbindShortcuts()
    }
    prevUserRef.current = user
  })

  return (
    <ThemeProvider theme={theme}>
      <div style={{ outline: "none" }}>
        <TopNav />
        <div className="col-lg-11 offset-lg-1 col-md-11 offset-md-1 col-sm-12">
          {children}
        </div>
        {/* Misc. modals*/}
        <SubmitFormStatus />
        <NewNodeForm />
        <NewEnvironmentForm />
        <ErrorDialog />
        <NewClusterForm />
        <NewApplicationForm />
        <NewResourceForm />
        <KeyboardShortcuts />
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)

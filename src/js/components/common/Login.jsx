import React, { useState, useEffect, useRef } from "react"
import { Modal } from "./Modal"
import { connect } from "react-redux"
import { displayLogin, logIn } from "../../actionCreators/authentication"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Login({ user, dispatch }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const logInRef = useRef(null)
  const prevShowLoginRef = useRef(user.showLogin)

  useEffect(() => {
    if (!prevShowLoginRef.current && prevShowLoginRef.current != user.showLogin) {
      if (logInRef.current) logInRef.current.focus()
    }
    prevShowLoginRef.current = user.showLogin
  })

  const handleChange = (field, value) => {
    if (field === "username") setUsername(value)
    else if (field === "password") setPassword(value)
  }

  const signInButtonClasses = () => {
    return `btn btn-info${user.failedLogin ? " singInButton" : ""}`
  }

  if (!user.showLogin) return null
  return (
    <Modal show={true} onHide={() => dispatch(displayLogin(false))} autoFocus={false} enforceFocus={false}>
      <Modal.Header>
        <Modal.Title>
          Log in
          <button
            className="btn btn-xs btn-secondary float-end"
            onClick={() => dispatch(displayLogin(false))}
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login-form">
          <form
            className="form-horizontal"
            id="loginForm"
            onSubmit={e => {
              e.preventDefault()
              dispatch(
                logIn({
                  password: password,
                  username: username
                })
              )
            }}
          >
            <div className="form-group">
              <label htmlFor="name" className="control-label">
                Adeo-ident
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon="user" />
                </span>
                <input
                  ref={logInRef}
                  type="text"
                  className="form-control"
                  placeholder="x123456"
                  onChange={e =>
                    handleChange("username", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon="lock" />
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={e =>
                    handleChange("password", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <br />
              <button
                type="submit"
                className={signInButtonClasses()}
                onClick={e => {
                  e.preventDefault()
                  dispatch(
                    logIn({
                      password: password,
                      username: username
                    })
                  )
                }}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
      {user.failedLogin ? (
        <Modal.Footer>
          <h5 className="text-danger text-center">
            Incorrect username or password
          </h5>
        </Modal.Footer>
      ) : (
        <div />
      )}
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login)

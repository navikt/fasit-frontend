import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classString from 'react-classset'

import {login} from '../actionCreators/authentication'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {username: "", password: ""}
    }

    handleLogin(e) {
        e.preventDefault()
        const auth = {
            password: this.state.password,
            username: this.state.username
        }
        this.props.dispatch(login(auth))

    }

    handleChange(field, e) {
        this.setState({[field]: e.target.value})
    }

    signInButton() {
        return classString({
            'btn': true,
            'btn-danger': true,
            'btn-lg': true,
            'btn-block': true,
            'singInButton': this.props.user.failedLogin
        })
    }
    showFailedLogin(){
        if (this.props.user.failedLogin)
            return <h5 className="password-message">Incorrect username or password</h5>
    }

    render() {

        return (
            <div className="col-md-12">
                <br />
                <br />
                <div className="col-md-8 col-md-offset-2">
                    <div className="row">
                        <div className="col-md-6 hidden-sm hidden-xs">
                            <br /> <br />

                            <img src="images/fasit-stempel.png" className="fasit-logo"/>
                        </div>
                        <div className="col-md-6">
                            <br />
                            <div className="main-login main-center">
                                <form action="#" className="form-horizontal" id="loginForm"
                                      onSubmit={this.handleLogin.bind(this)}>
                                    <div className="form-group">
                                        <label form="name" className="control-label">Adeo-ident</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user fa"></i></span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="x123456"
                                                value={this.state.username}
                                                onChange={this.handleChange.bind(this, "username")}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label form="password" className="control-label">Password</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i
                                                className="fa fa-lock fa-lg"></i></span>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                value={this.state.password}
                                                onChange={this.handleChange.bind(this, "password")}
                                            />
                                        </div>
                                    </div>
                                    <br />

                                    <div className="form-group">
                                        <button type="submit" className={this.signInButton()}
                                                action="/">
                                            Sign in
                                        </button>
                                    </div>
                                    <div>
                                        {this.showFailedLogin()}
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Login)
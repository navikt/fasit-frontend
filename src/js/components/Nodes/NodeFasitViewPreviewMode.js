import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { DropdownButton, MenuItem, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { checkAuthentication } from '../../utils/'
import { showEditNodeForm, showNewNodeForm, showDeleteNodeForm } from '../../actionCreators/nodeFormActions'
import { fetchNodePassword, clearNodePassword, showPassword } from '../../actionCreators/node_fasit'

class NodeFasitViewPreviewMode extends Component {
    constructor(props) {
        super(props)
    }

    displayPassword(overlayProps) {
        const {fasit} = this.props
        if (fasit.showPassword) {
            return (
                <OverlayTrigger {...overlayProps}>
                <span
                    id="password"
                    className="text-right"
                    onDoubleClick={this.handleCopyText.bind(this, "password")}>{fasit.currentPassword}</span>
                </OverlayTrigger>
            )
        }
        return <span className="text-right">••••••••••••••••</span>
    }

    handleShowPassword(value) {
        const {dispatch} = this.props
        if (value) {
            dispatch(fetchNodePassword())
            dispatch(showPassword(value))
        } else if (!value) {
            dispatch(showPassword(value))
            dispatch(clearNodePassword())
        }
    }

    handleCopyText(element) {
        let el = document.getElementById(element)
        let range = document.createRange()
        range.selectNodeContents(el)
        let sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)

        document.execCommand("copy")
    }

    handleDropdownItem(value) {
        const {dispatch} = this.props
        switch (value) {
            case "edit":
                dispatch(showEditNodeForm(true))
                return
            case "new":
                dispatch(showNewNodeForm(true))
                return
            case "delete":
                dispatch(showDeleteNodeForm(true))
                return

        }
    }


    showRevealPasswordButton() {
        const {user, fasit} = this.props
        if (checkAuthentication(user)) {
            if (fasit.showPassword) {
                return <span className="fa fa-eye-slash text-right information-box-header-clickable"
                             onClick={this.handleShowPassword.bind(this, false)}></span>
            }
            return <span className="fa fa-eye text-right information-box-header-clickable"
                         onClick={this.handleShowPassword.bind(this, true)}></span>
        }
    }

    showEditNodeButton() {
        if (checkAuthentication(this.props.user)) {
            return (
                <div className="pull-right">
                    <DropdownButton bsStyle="default"
                                    title={<span><i className="fa fa-cog"></i>&nbsp;&nbsp;Tools</span>} id="nodeTools">
                        <MenuItem onClick={this.handleDropdownItem.bind(this, "edit")}><i
                            className="fa fa-pencil-square-o"></i>&nbsp;&nbsp;Edit</MenuItem>
                        <MenuItem onClick={this.handleDropdownItem.bind(this, "delete")}><i
                            className="fa fa-trash"></i>&nbsp;&nbsp;Delete node</MenuItem>
                        <MenuItem divider/>
                        <MenuItem onClick={this.handleDropdownItem.bind(this, "new")}><i
                            className="fa fa-plus"></i>&nbsp;&nbsp;Create new node</MenuItem>
                    </DropdownButton>
                </div>
            )

        }
        return <DropdownButton bsStyle="default" bsClass="pull-right"
                               title={<span><i className="fa fa-cog"></i>&nbsp;&nbsp;Tools</span>} id="nodeTools"
                               disabled={true}/>
    }


    render() {
        const {fasit} = this.props
        const fasitData = fasit.data
        const overlayProps = {
            placement: "right",
            trigger: "click",
            rootClose: true,
            overlay: <Tooltip id="copied">Copied!</Tooltip>

        }
        return (
            <div>
                <div className="information-main">
                    <div className="information-main-header">
                        <div className="information-main-title">
                            <span><i className="fa fa-laptop fa-fw"></i>&nbsp;Node</span>
                            {this.showEditNodeButton()}
                        </div>
                    </div>
                    <div className="information-main-body">
                        <div className="information-main-content">
                            <b>Hostname:</b>
                            <OverlayTrigger {...overlayProps}>
                                <span className="text-right"
                                      id="hostname"
                                      onClick={this.handleCopyText.bind(this, "hostname")}> {fasitData.hostname}</span>
                            </OverlayTrigger>
                        </div>
                        <div className="information-main-content">
                            <b>Type:</b>
                            <OverlayTrigger {...overlayProps}>
                            <span className="text-right"
                                  id="type"
                                  onClick={this.handleCopyText.bind(this, "type")}> {fasitData.type}</span>
                            </OverlayTrigger>
                        </div>
                        <div className="information-main-content">
                            <b>User:</b>
                            <OverlayTrigger {...overlayProps}>
                            <span className="text-right"
                                  id="user"
                                  onClick={this.handleCopyText.bind(this, "user")}> {fasitData.username}</span>
                            </OverlayTrigger>
                        </div>
                        <div className="information-main-content">
                            <b>Password:</b>{this.showRevealPasswordButton()}{this.displayPassword(overlayProps)}

                        </div>
                        <div className="information-main-content">
                            <b>Cluster:</b>
                            <OverlayTrigger {...overlayProps}>
                                <span
                                    className="text-right"
                                    id="cluster"
                                    onClick={this.handleCopyText.bind(this, "cluster")}

                                >{fasitData.cluster ? fasitData.cluster.name : "Orphaned node"}</span>
                            </OverlayTrigger>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

Node.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        fasit: state.node_fasit,
        user: state.user,
    }
}

export default connect(mapStateToProps)(NodeFasitViewPreviewMode)

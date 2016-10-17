import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {REQUEST_REVISIONS} from '../actionTypes'


class Home extends Component {
    constructor(props) {
        super(props)
    }

    retrieveRevisions(hostname) {
        const {dispatch} = this.props
        dispatch({type: REQUEST_REVISIONS, value: hostname})
    }

    render() {
        const {fasit} = this.props

        return (
            <div className="text-center">
                <br />
                <br />
                <span><img src="images/fasit-stempel.png" alt="FASIT" className="home-brand-logo"/>
                <div className="home-brand-name">Fasit</div></span>
                <br />
                <button type="button" onClick={this.retrieveRevisions.bind(this, "d26jbsl00697.test.local")}>
                    Previous
                </button>
                <br />
                <br />
                <br />
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <form className="configurationSearchForm">
                            <label className="sr-only" >Search</label>
                            <input type="search" className="form-control" id="sok" placeholder="Search"/>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
    Node.propTypes = {
    dispatch: PropTypes.func.isRequired
}

    const mapStateToProps = (state) => ({
        fasit: state.nodeData.fasit,
    })

    export default connect(mapStateToProps)(Home)

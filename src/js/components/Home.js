import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


class Home extends Component {
    constructor(props) {
        super(props)
    }



    render() {

        return (
            <div className="text-center">
                <br />
                <br />
                <span><img src="images/fasit-stempel.png" alt="FASIT" className="home-brand-logo"/>
                <div className="home-brand-name">Fasit</div></span>
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
    })

    export default connect(mapStateToProps)(Home)

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
           // selectedOption: null,
            //visible: true
        }
    }






    render() {
        console.log("redner ", this.props)
        return this.props.navsearch ?
             <div>{this.props.navSearch.searchResults.map(sr => <div>{sr.name + "  " + sr.type}</div>)}</div> : null
    }

}

const mapStateToProps = (state) => {
    return {
        //location: state.routing.locationBeforeTransitions,
        navSearch : state.navsearch
    }
}

export default connect(mapStateToProps)(Search)
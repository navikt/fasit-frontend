import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card'
import {styles, colors}  from '../../commonStyles/commonInlineStyles'
import {capitalize} from '../../utils/'

const CLUSTER = "cluster"
const NODE = "node"
const RESOURCE = "resource"
const APPLICATION = "application"
const ENVIRONMENT = "environment"
const INSTANCE = "instance"
const APPCONFIG = "appconfig"
class Search extends Component {


    constructor(props) {
        super(props)
        this.state = {}
    }

    // eget card element

    searchResultCard(searchResult, idx) {
        return (
            <div style={styles.paddingTop5} key={idx}>
                <Card >
                    <CardHeader title={`${capitalize(searchResult.info)} ${capitalize(searchResult.name)}`}
                                titleStyle={styles.bold}
                                subtitle={capitalize(searchResult.type)}/>


                </Card></div>)
    }

    render() {
        console.log("props", this.props)
        //if(this.props.searchResults) {
        console.log("redner ", this.props)


        return (<div className="main-content-container">
            <div className="row">
                <div className="col-sm-12">
                    {this.props.searchResults.data.map((sr, idx) => this.searchResultCard(sr, idx))}
                </div>
            </div>
        </div>)
    }
}

const mapStateToProps = (state) => {
    console.log("staten island", state)
    return {
        //location: state.routing.locationBeforeTransitions,
        searchResults: state.search
    }
}

export default connect(mapStateToProps)(Search)
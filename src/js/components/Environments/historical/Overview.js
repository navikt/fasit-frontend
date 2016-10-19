import React from 'react'
import {Link} from 'react-router'
import classString from 'react-classset'


export default React.createClass({
    getInitialState(){
        return {
            dodgyResources: [],
            sensuData: [],
            displayDodgyResources: false,
            displayIbmConsoles: false
        }
    },
    componentDidMount(){
        this.setState({
            dodgyResources: this.fetchDodgyResources(),
            sensuData: this.fetchSensuEvents()
        })
    },
    fetchSensuEvents(){
    },
    fetchDodgyResources() {
        return [
            {
                "alias": "personkortet",
                "type": "baseUrl",
                "properties": "http://balls.deep.com"

            },
            {
                "alias": "APP_GETQ_TREKKOMPONENT",
                "type": "Queue",
                "properties": "queueName(STRING): QA.Q_TRASH.QUEUE"

            }]
    },
    showElements: function (elem) {
        return classString({
            'overview-list': true,
            'hidden': !this.state[elem],
        })
    },
    dropdownArrowDirection: function (elem) {
        return classString({
            'fa': true,
            'fa-angle-double-down': !this.state[elem],
            'fa-angle-double-up': this.state[elem]
        })
    },
    toggleShowElements(elem){
        this.setState({[elem]: !this.state[elem]})
    },
    render() {
        let environment = this.props.params.environment
        var eventsInEnvironment = this.state.sensuData.filter(function(event){
            return event.client.tags.environment === environment
        })
        return (
            <div>
                <br />

                {/* --- Resource menu --- */}
                <div className="col-md-3">
                    <b onClick={this.toggleShowElements.bind(null, "displayIbmConsoles")}
                       className="resource-list-header">
                        <i className={this.dropdownArrowDirection("displayIbmConsoles")}></i>&nbsp;&nbsp;IBM consoles  </b>
                    <ul className={this.showElements("displayIbmConsoles")}>
                        <li className=""><a href={this.props.environment.wasDmgr}>WAS Deployment Manager - FSS</a></li>
                        <li className=""><a href={this.props.environment.bpmDmgr}>BPM Deployment Manager - FSS</a></li>
                    </ul>

                    <br />

                    <b onClick={this.toggleShowElements.bind(null, "displayDodgyResources")}
                       className="resource-list-header">
                        <i className={this.dropdownArrowDirection("displayDodgyResources")}></i>&nbsp;&nbsp;Dodgy resources
                    </b>
                        <span className="badge badge-primary pull-right">{this.state.dodgyResources.length}</span>
                    <ul className={this.showElements("displayDodgyResources")}>
                        {this.state.dodgyResources.map(function (resource) {
                            return <li key={resource.alias + resource.properties}><Link to={"/resources/" + resource.alias}>{resource.alias}</Link></li>
                        })}
                    </ul>
                </div>
                {/* --- Sensu Events--- */}

                <div className="col-md-6">
                    <div className="well well-sm">
                        <b>Events in {this.props.params.environment}</b>
                        <span className="badge badge-primary pull-right">{eventsInEnvironment.length}</span>
                        <hr className="event-separator"/>
                        <table>
                            <tbody>
                            {eventsInEnvironment.map(function (event) {
                                return <SensuEventRow key={event.id} event={event}></SensuEventRow>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Todo:
                        </div>
                        <div className="panel-body">
                            <ul>
                                <li>Hva har skjedd her i det siste?</li>
                                <ul>
                                    <li>nye noder lagt til</li>
                                    <li>historikk for miljøet</li>
                                </ul>
                                <li>deploy av apps</li>
                                <li>Hvor mange av ting</li>
                                <li>statz</li>
                                <li>feilmeldinger</li>
                                <li>logger</li>
                                <li>kostnader</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
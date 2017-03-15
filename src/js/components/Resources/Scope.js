import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormDropDown} from '../common/Forms'

class Scope extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        const {editMode, scope, environmentClasses, environments, applications, zones} = this.props
        if (!editMode) {

            const envClass = scope.environmentclass ? scope.environmentclass : '-'
            const environment = scope.environment ? scope.environment : '-'
            const zone = scope.zone ? scope.zone : '-'
            const application = scope.application ? scope.application : '-'

            return (<div className="row">
                <div className="col-md-3 FormLabel"><b>Scope:</b></div>
                <div className="col-md-9 FormValue">{`${envClass} | ${zone} | ${environment} | ${application}`}</div>
            </div>)
        }
        else {
            return (<div className="well well-lg" style={{marginTop: "5px", paddingTop: "5px"}}>
                    <div className="row FormLabel"><b>Scope:</b></div>
                    <div className="row">
                        {this.formListElement(
                            "environmentclass",
                            scope.environmentclass,
                            environmentClasses
                        )}
                        {this.formListElement(
                            "zone",
                            scope.zone,
                            zones
                        )}
                        {this.formListElement(
                            "environment",
                            scope.environment,
                            environments.filter(e => scope.environmentclass === e.environmentclass).map(e => e.name)
                        )}
                        {this.formListElement(
                            "application",
                            scope.application,
                            applications
                        )}
                    </div>
                    <div className="col-xs-12" style={{height: 15 + 'px'}}></div>
                </div>
            )
        }
    }

    formListElement(label, value, options) {
        return <FormDropDown label={label}
                             value={value ? value : '-'}
                             editMode={this.props.editMode}
                             handleChange={this.props.handleChange}
                             options={options}
                             parent="scope"/>
    }
}


const mapStateToProps = (state) => {
    return {
        environmentClasses: state.environments.environmentClasses,
        environments: state.environments.environments,
        applications: state.applications.applicationNames,
        zones: state.environments.zones
    }
}

export default connect(mapStateToProps)(Scope)

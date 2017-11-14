import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MaterialDropDown } from '../common/Forms'

class Scope extends Component {

    constructor(props) {
        super(props)
    }

    handleChange(field, newValue) {
        const { scope, handleChange } = this.props
        const newScope = { ...scope }
        newScope[field] = newValue

        if (field === "environmentclass") {
            newScope.environment = null
        }

        handleChange("scope", newScope)
    }

    render() {
        const { scope, environmentClasses, environments, applications, zones } = this.props

        if (!scope) {
            return null
        }

        return (
            <div className="scope-well">
                <div><b>Scope</b></div>
                <MaterialDropDown
                    field="environmentclass"
                    value={scope.environmentclass}
                    label="Environment class"
                    options={environmentClasses}
                    onChange={this.handleChange.bind(this)}
                    fullWidth={false} />
                <MaterialDropDown
                    field="environment"
                    value={scope.environment}
                    label="Environment"
                    options={[null].concat(environments.filter(e => scope.environmentclass === e.environmentclass).map(e => e.name))}
                    onChange={this.handleChange.bind(this)} fullWidth={false} /><br />
                <MaterialDropDown
                    field="zone"
                    value={scope.zone}
                    label="Zone"
                    options={[null].concat(zones)}
                    onChange={this.handleChange.bind(this)}
                    fullWidth={false} />
                <MaterialDropDown
                    field="application"
                    value={scope.application}
                    label="Application"
                    options={[null].concat(applications)}
                    onChange={this.handleChange.bind(this)}
                    fullWidth={false} />
            </div>
        )
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

import React, { Component } from "react"
import { connect } from "react-redux"
import { FormDropDown } from "../common/Forms"
import { styles } from "../../commonStyles/commonInlineStyles"

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
    const {
      scope,
      environmentClasses,
      environments,
      applications,
      zones,
    } = this.props

    if (!scope) {
      return null
    }

    return (
      <div className="row" style={{ paddingTop: "1rem" }}>
        <div className="col-md-12">
          <b>Scope</b>
        </div>
        <div className="col-md-6">
          <FormDropDown
            field="environmentclass"
            value={scope.environmentclass}
            label="Environment class"
            options={environmentClasses}
            handleChange={this.handleChange.bind(this)}
          />
        </div>

        <div className="col-md-6">
          <FormDropDown
            field="environment"
            value={scope.environment}
            label="Environment"
            options={[null].concat(
              environments
                .filter((e) => scope.environmentclass === e.environmentclass)
                .map((e) => e.name)
            )}
            handleChange={this.handleChange.bind(this)}
            fullWidth={false}
          />
        </div>
        <div className="col-md-6">
          <FormDropDown
            field="zone"
            value={scope.zone}
            label="Zone"
            options={[null].concat(zones)}
            handleChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="col-md-6">
          <FormDropDown
            field="application"
            value={scope.application}
            label="Application"
            options={[null].concat(applications)}
            handleChange={this.handleChange.bind(this)}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    environmentClasses: state.environments.environmentClasses,
    environments: state.environments.environments,
    applications: state.applications.applicationNames,
    zones: state.environments.zones,
  }
}

export default connect(mapStateToProps)(Scope)

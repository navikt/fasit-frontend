import React from 'react'
import { MaterialDropDown } from '../common/Forms'

function Scope({ scope, handleChange, environmentClasses, environments, applications, zones }) {
    const onFieldChange = (field, newValue) => {
        const newScope = { ...scope }
        newScope[field] = newValue

        if (field === "environmentclass") {
            newScope.environment = null
        }

        handleChange("scope", newScope)
    }

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
                onChange={onFieldChange}
                fullWidth={false} />
            <MaterialDropDown
                field="environment"
                value={scope.environment}
                label="Environment"
                options={[null].concat(environments.filter(e => scope.environmentclass === e.environmentclass).map(e => e.name))}
                onChange={onFieldChange} fullWidth={false} /><br />
            <MaterialDropDown
                field="zone"
                value={scope.zone}
                label="Zone"
                options={[null].concat(zones)}
                onChange={onFieldChange}
                fullWidth={false} />
            <MaterialDropDown
                field="application"
                value={scope.application}
                label="Application"
                options={[null].concat(applications)}
                onChange={onFieldChange}
                fullWidth={false} />
        </div>
    )
}

export default Scope

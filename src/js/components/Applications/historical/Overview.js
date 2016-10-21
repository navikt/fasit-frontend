import React from 'react'


export default React.createClass({
    render() {
        return (
            <div>
                <div>
                    <h1>Ovahwhjioo for {this.props.params.application}</h1>
                </div>
                <div className="col-md-3 col-md-offset-9">
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
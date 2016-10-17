import React from 'react'


export default React.createClass({

    render(){
        return (
            <div className="col-md-12">
                <h1>{this.props.cluster || this.props.params.cluster}</h1>
                <div className="col-md-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Todo:
                        </div>
                        <div className="panel-body">
                            <ul>
                                <li>nås v/søk eller linking fra div</li>
                                <li>bør inneholde info/integrasjoner:</li>
                                <ul>
                                    <li>sera (ressurser og status)</li>
                                    <li>basta (bestillinger + modifiseringer, f.eks øke minne med 2gb)</li>
                                    <li>fasit (applikasjon,miljø mm)</li>
                                    <li>grafana (ytelse siste døgn?)</li>
                                    <li>link til kibana</li>
                                    <li>Editeringsmuligheter</li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-md-offset-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Todo:
                        </div>
                        <div className="panel-body">
                            <ul>
                                <li>nås v/søk eller linking fra div</li>
                                <li>bør inneholde info/integrasjoner:</li>
                                <ul>
                                    <li>sera (ressurser og status)</li>
                                    <li>basta (bestillinger + modifiseringer, f.eks øke minne med 2gb)</li>
                                    <li>fasit (applikasjon,miljø mm)</li>
                                    <li>grafana (ytelse siste døgn?)</li>
                                    <li>link til kibana</li>
                                    <li>Editeringsmuligheter</li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-success">edit shit</button>
            </div>
        )
    }
})
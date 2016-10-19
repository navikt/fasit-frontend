import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
    fetchInstances(){
        return [{
            "name": "appname:1.2.3",
            "environment": "p",
            "cluster": "app-cluster",
            "selftest": "http://url.com",
        }, {
            "name": "app2:1.2.3",
            "environment": "q8",
            "cluster": "app2-cluster",
            "selftest": "http://url.com",
        },{
            "name": "app3:1.2.3",
            "environment": "t1000",
            "cluster": "app3-cluster",
            "selftest": "http://url.com",
        }]
    },
    render() {
        let that = this
        return (
            <div>
                <div>
                    <h1>Instances in {this.props.params.environment}</h1>
                </div>
                <div>
                    <ul>
                        {this.fetchInstances().map(function (instance) {
                            return <li key={instance.name}><Link to={"/environments/" + that.props.params.environment + '/instances/' + instance.name}>{instance.name}</Link></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
})
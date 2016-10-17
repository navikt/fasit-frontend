import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
    fetchClusters(){
        return [{
            "name": "clustername:1.2.3",
            "environment": "p",
            "cluster": "app-cluster",
            "selftest": "http://url.com",
        }, {
            "name": "cluster2:1.2.3",
            "environment": "q8",
            "cluster": "app2-cluster",
            "selftest": "http://url.com",
        },{
            "name": "cluster3:1.2.3",
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
                    <h1>Clusters for {this.props.params.application}</h1>
                </div>
                <div>
                    <ul>
                        {this.fetchClusters().map(function (cluster) {
                                return <li key={cluster.name}><Link to={"/applications/" + that.props.params.application + '/clusters/' + cluster.name}>{cluster.name}</Link></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
})
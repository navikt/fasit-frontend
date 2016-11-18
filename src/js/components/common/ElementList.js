import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class ElementList extends Component {
    constructor(props) {
        super(props)
    }

    generateNodesList() {
        const {data} = this.props
        if (data.isFetching)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>
        else if (data.requestFailed)
            return <pre>{data.requestFailed}</pre>
        return data.data.map((item, index)=> {
            return (
                <Link key={index} to={'/nodes/' + item.hostname} className="element-list-item"
                      activeClassName='element-list-item-active'>
                    <div>
                        <h5><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.hostname}</h5>
                        <i className="fa fa-globe fa-fw"></i> {item.environment} <b> | </b>
                        {item.cluster ? item.cluster.name : ""}
                    </div>
                </Link>
            )
        })
    }

    generateElementList() {
        const {type} = this.props
        switch (type) {
            case "nodes":
                return this.generateNodesList()
        }
    }

    render() {
        const {toFirstPage, toLastPage, toNextPage, toPrevPage, current, last, total} = this.props

        return (
            <div>
                <div className="element-list">
                    {this.generateElementList()}
                </div>
                <div className="element-list-paging">
                    <hr style={{border: 1 + 'px  solid #ddd'}}/>

                    <div className="btn-group btn-group-justified">
                        <a className="btn btn-default" onClick={toFirstPage}>{"<<"}</a>
                        <a className="btn btn-default"
                           onClick={toPrevPage}>{"<"}</a>
                        <div className="element-list-paging-number">
                            {current} / {!isNaN(last) ? last + 1 : last}
                        </div>
                        <a className="btn btn-default"
                           onClick={toNextPage}>{">"}</a>
                        <a className="btn btn-default" onClick={toLastPage}>{">>"}</a>
                    </div>
                    <h4 className="text-center">{total} results</h4>

                    <div className="element-list-paging-summary">
                    </div>
                </div>
            </div>
        )

    }
}

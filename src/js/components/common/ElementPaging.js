import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class ElementPaging extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {toFirstPage, toLastPage, toNextPage, toPrevPage, current, last, total} = this.props
        return (
                <div className="element-list-paging">
                    <hr style={{border: 1 + 'px  solid #ddd'}}/>

                    <div className="btn-group btn-group-justified">
                        <a className="btn btn-default sidebarNav-link" onClick={toFirstPage}><i className="fa fa-angle-double-left" aria-hidden="true" /></a>
                        <a className="btn btn-default sidebarNav-link"
                           onClick={toPrevPage}><i className="fa fa-angle-left" aria-hidden="true" /></a>
                        <div className="element-list-paging-number">
                            {current} / {!isNaN(last) ? last + 1 : last}
                        </div>
                        <a className="btn btn-default sidebarNav-link"
                           onClick={toNextPage}><i className="fa fa-angle-right" aria-hidden="true" /></a>
                        <a className="btn btn-default sidebarNav-link" onClick={toLastPage}><i className="fa fa-angle-double-right" aria-hidden="true" /></a>
                    </div>
                    <h4 className="text-center">{total} results</h4>

                    <div className="element-list-paging-summary">
                    </div>
                </div>
        )

    }
}

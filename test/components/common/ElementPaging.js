import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai'
import chaiSpies from 'chai-spies'
chai.use(chaiSpies)

import {initialState as search} from '../../../src/js/reducers/filter'
import {initialState as nodes} from '../../../src/js/reducers/nodes'
import {initialState as resources} from '../../../src/js/reducers/resources'
import {initialState as environments} from '../../../src/js/reducers/environments'
import {initialState as applications} from '../../../src/js/reducers/applications'
import {initialState as instances} from '../../../src/js/reducers/instances'
import {ElementPaging} from '../../../src/js/components/common/ElementPaging'


describe('(Component) ElementPaging', () => {
    it('renders with context nodes without exploding', () => {
        const searchWithContext = Object.assign({}, search, {context:"nodes"})
        const wrapper = shallow(<ElementPaging nodes={nodes} search={searchWithContext}/>)
        expect(wrapper).to.have.length(1)
    });
    it('renders with context resources without exploding', () => {
        const searchWithContext = Object.assign({}, search, {context:"resources"})
        const wrapper = shallow(<ElementPaging resources={resources} search={searchWithContext}/>)
        expect(wrapper).to.have.length(1)
    });
    it('renders with context environments without exploding', () => {
        const searchWithContext = Object.assign({}, search, {context:"environments"})
        const wrapper = shallow(<ElementPaging environments={environments} search={searchWithContext}/>)
        expect(wrapper).to.have.length(1)
    });
    it('renders with context applications without exploding', () => {
        const searchWithContext = Object.assign({}, search, {context:"applications"})
        const wrapper = shallow(<ElementPaging applications={applications} search={searchWithContext}/>)
        expect(wrapper).to.have.length(1)
    });
    it('renders with context instances without exploding', () => {
        const searchWithContext = Object.assign({}, search, {context:"instances"})
        const wrapper = shallow(<ElementPaging instances={instances} search={searchWithContext}/>)
        expect(wrapper).to.have.length(1)
    });
    it('should call changePage when first is clicked', () => {
        const first = chai.spy(() => {})
        const props = {displayAccessControlForm: true, onClose}
        const wrapper = shallow(<AccessControl {...props}/>)
        wrapper.find("#close").simulate('click')
        expect(onClose).to.have.been.called()

    });
});

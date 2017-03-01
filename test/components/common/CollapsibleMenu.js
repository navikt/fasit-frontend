import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai'

import {CollapsibleMenu, CollapsibleMenuItem} from '../../../src/js/components/common/CollapsibleMenu';

describe('(Component) CollapsibleMenu', () => {
    it('renders CollapsibleMenu without exploding', () => {
        expect(shallow(<CollapsibleMenu/>)).to.have.length(1)
    })
    it('renders CollapsibleMenu with children', () => {
        const wrapper = shallow(<CollapsibleMenu><CollapsibleMenuItem /></CollapsibleMenu>)
        expect(wrapper.children()).to.have.length(1)
    })
})
describe('(Component) CollapsibleMenuItem', () => {
    it('renders CollapsibleMenuItem without exploding', () => {
        const wrapper = shallow(<CollapsibleMenuItem/>)
        expect(wrapper).to.have.length(1)
    })
    it('shows heading when passed label', () => {
        const props = {label: "itemHeader"}
        const wrapper = shallow(<CollapsibleMenuItem {...props}><div /></CollapsibleMenuItem>)
        expect(wrapper.find('#label').children().contains("itemHeader"))
    })
    it('does not show children by default', () => {
        const wrapper = shallow(<CollapsibleMenuItem><div /></CollapsibleMenuItem>)
        expect(wrapper.find('div').children()).to.have.length(1)
    })
    it('shows children when header is clicked', () => {
        const wrapper = shallow(<CollapsibleMenuItem><div /></CollapsibleMenuItem>)
        wrapper.find("a").simulate('click')
        expect(wrapper.find('div').children()).to.have.length(2)
    })
})

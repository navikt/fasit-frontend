import React from 'react';
import { shallow } from 'enzyme';
import chai, {expect} from 'chai'
import chaiSpies from 'chai-spies'
chai.use(chaiSpies)

import AccessControl from '../../../src/js/components/common/AccessControl'

describe('(Component) AccessControl', () => {
    it('renders AccessControl without exploding', () => {
        const wrapper = shallow(<AccessControl/>)
        expect(wrapper).to.have.length(1)
    });
    it('is visible when displayAccessControlForm is false', () => {
        const props = {displayAccessControlForm: false}
        const wrapper = shallow(<AccessControl {...props}/>)
        expect(wrapper.props().show).to.equal(false)
    });
    it('is visible when displayAccessControlForm is true', () => {
        const props = {displayAccessControlForm: true}
        const wrapper = shallow(<AccessControl {...props}/>)
        expect(wrapper.props().show).to.equal(true)
    });
    it('should call onSubmit when submit is clicked', () => {
        const onSubmit = chai.spy(() => {})
        const props = {displayAccessControlForm: true, onSubmit}
        const wrapper = shallow(<AccessControl {...props}/>)
        wrapper.find("#submit").simulate('click')
        expect(onSubmit).to.have.been.called()

    });
    it('should call onClose when close is clicked', () => {
        const onClose = chai.spy(() => {})
        const props = {displayAccessControlForm: true, onClose}
        const wrapper = shallow(<AccessControl {...props}/>)
        wrapper.find("#close").simulate('click')
        expect(onClose).to.have.been.called()

    });
});

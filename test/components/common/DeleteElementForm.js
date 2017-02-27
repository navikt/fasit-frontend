import React from 'react';
import { shallow } from 'enzyme';
import chai, {expect} from 'chai'
import chaiSpies from 'chai-spies'
chai.use(chaiSpies)

import DeleteElementForm from '../../../src/js/components/common/DeleteElementForm'

describe('(Component) DeleteElementForm', () => {
    it('renders DeleteElementForm without exploding', () => {
        const wrapper = shallow(<DeleteElementForm/>)
        expect(wrapper).to.have.length(1)
    });
    it('is not visible when displayDeleteForm is false', () => {
        const props = {displayDeleteForm: false}
        const wrapper = shallow(<DeleteElementForm {...props}/>)
        expect(wrapper.props().show).to.equal(false)
    });
    it('is visible when displayDeleteForm is true', () => {
        const props = {displayDeleteForm: true}
        const wrapper = shallow(<DeleteElementForm {...props}/>)
        expect(wrapper.props().show).to.equal(true)
    });
    it('should call onSubmit when submit is clicked', () => {
        const onSubmit = chai.spy(() => {})
        const props = {displayDeleteForm: true, onSubmit}
        const wrapper = shallow(<DeleteElementForm {...props}/>)
        wrapper.find("#submit").simulate('click')
        expect(onSubmit).to.have.been.called()

    });
    it('should call onClose when close is clicked', () => {
        const onClose = chai.spy(() => {})
        const props = {displayDeleteForm: true, onClose}
        const wrapper = shallow(<DeleteElementForm {...props}/>)
        wrapper.find("#close").simulate('click')
        expect(onClose).to.have.been.called()

    });
});

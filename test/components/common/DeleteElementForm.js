import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai'

import DeleteElementForm from '../../../src/js/components/common/DeleteElementForm'

describe('(Component) DeleteElementForm', () => {
    it('renders DeleteElementForm without exploding', () => {
        expect(shallow(<DeleteElementForm/>)).to.have.length(1)
    });
});

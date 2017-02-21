import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai'

import {AuraTools} from '../../../src/js/components/common/AuraTools'

describe('(Component) AuraTools', () => {
    it('renders AuraTools without exploding', () => {
        expect(shallow(<AuraTools/>)).to.have.length(1)
    });
});

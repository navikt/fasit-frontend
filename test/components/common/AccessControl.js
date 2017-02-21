import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai'

import AccessControl from '../../../src/js/components/common/AccessControl'

describe('(Component) AccessControl', () => {
    it('renders AccessControl without exploding', () => {
        expect(shallow(<AccessControl/>)).to.have.length(1)
    });
});

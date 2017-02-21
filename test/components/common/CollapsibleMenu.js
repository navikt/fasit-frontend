import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai'

import {CollapsibleMenu, CollapsibleMenuItem} from '../../../src/js/components/common/CollapsibleMenu';

describe('(Component) CollapsibleMenu', () => {
    it('renders CollapsibleMenu without exploding', () => {
        expect(shallow(<CollapsibleMenu/>)).to.have.length(1)
    })
    it('renders CollapsibleMenuItem without exploding', () => {
        expect(shallow(<CollapsibleMenuItem/>)).to.have.length(1)
    })
})

/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import CustomerShowComponent from 'components/customer/CustomerShowComponent.js';

describe('CustomerShowComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(CustomerShowComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('customershow-component');
  });
});

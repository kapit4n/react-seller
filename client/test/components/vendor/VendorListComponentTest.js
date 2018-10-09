/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import VendorListComponent from 'components/vendor/VendorListComponent.js';

describe('VendorListComponent', () => {
  let component;

  /** Load vendors */
  beforeEach(() => {
    component = createComponent(VendorListComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('vendorlist-component');
  });
  
  it('should list the vendors on the API', () => {
    // query the table that holds the vendors
    // count and review that there is more than one vendor
  });
});

/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import VendorShowComponent from 'components/vendor/VendorShowComponent.js';

describe('VendorShowComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(VendorShowComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('vendorshow-component');
  });
  
  it('should show information of a vendor', () => {
    // Set vendor id param before the component has been mount
    // Query fields/values rendered
    // Verify that the information is not null
    expect(component.props.className).to.equal('vendorshow-component');
  });
  
});

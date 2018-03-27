/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import VendorEditComponent from 'components/vendor/VendorEditComponent.js';

describe('VendorEditComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(VendorEditComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('vendoredit-component');
  });

  it('should render the Vendor information', () => {
    // set and load the vendor by id
    // query vendor fields
    // match that the information of vendor is not null
  });
});

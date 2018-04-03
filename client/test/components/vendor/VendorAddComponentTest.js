/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import VendorAddComponent from 'components/vendor/VendorAddComponent.js';

describe('VendorAddComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(VendorAddComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('vendoradd-component');
  });
  
  it('should render the name, address and description fields', () => {
    // query the name, description and address fields
    // match that the values are entry    
  });
    
  it('should save the vendor information', () => {
    // set name, description and address values
    // click on save button
    // match that the page redirects to customer info page
  });
  
});

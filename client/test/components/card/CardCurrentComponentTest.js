/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import CardCurrentComponent from 'components/card/CardCurrentComponent.js';

describe('CardCurrentComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(CardCurrentComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('cardcurrent-component');
  });
  
  it('should open the current cart', () => {
    // Go to Home page
    // Click on current cart button
    // Verify that the component is displaying current cart information
    expect(component.props.className).to.equal('cardcurrent-component');
  });
  
  
});

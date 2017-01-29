'use strict';

import React from 'react';

require('styles//Home.css');
import { Grid, Row, Col, Image, Button} from 'react-bootstrap';

class HomeComponent extends React.Component {
  render() {
    return (
      <div className="home-component">
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={4}>
                <Image xs={12} md={12} src="http://www.shinzoo.com/images002/toys-01/toys/04.jpg" thumbnail />
                <Button xs={12} md={12}  bsStyle="link">Peaceable Kingdom Scratch-Off Silly Jokes <br /> Super Valentine Card Pack</Button>
              </Col>
              <Col xs={6} md={4}>
                <Image  xs={12} md={12} src="http://www.shinzoo.com/images002/toys-01/toys/03.jpg" thumbnail />
                <Button xs={12} md={12}  bsStyle="link">Pokemon Party Supplies Silicone <br /> Wristband Bracelet Favors 12 Count</Button>
              </Col>
              <Col xs={6} md={4}>
                <Image xs={12} md={12} src="https://foodheart.org/assets/toys-main-5c1feeb193fe726a922fafb59d82d512.png" thumbnail />
                <Button xs={12} md={12}  bsStyle="link">Peaceable Kingdom Flying Paper <br /> Airplanes Super Valentine Card Pack</Button>
              </Col>
            </Row>
          </Grid>
      </div>
    );
  }
}

HomeComponent.displayName = 'HomeComponent';

// Uncomment properties you need
// HomeComponent.propTypes = {};
// HomeComponent.defaultProps = {};

export default HomeComponent;

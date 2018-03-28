'use strict';

import React from 'react';
import { Button, ButtonToolbar, FormGroup, ControlLabel, FormControl, Grid, Media, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

require('styles/vendor/VendorEdit.css');

/**
 * Component to edit the vendor information
 */
class VendorEditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.vendorURL = 'http://localhost:3000/api/vendors/';
        this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
        this.props = props;
        this.state = { id: 0, name: '', budget: '', address: ''};
    }
    
    /**
     * Sends the new vendor information to API to be updated
     */
    handleOk = () => {
        var vendor = {
            id: this.state.id,
            name: this.state.name,
            budget: this.state.budget,
            address: this.state.address
        };

        fetch(this.vendorURL + this.state.id + '?access_token=' + this.access_token, {
                method: 'PUT',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify(vendor)
            }).then((response) => response.json())
            .then((responseJson) => { browserHistory.push('/vendor-show/' + this.state.id);})
            .catch((error) => { console.error(error); });
    };

    /**
     * Loads vendor information and set to state
     */
    componentDidMount() {
        fetch(this.vendorURL + this.props.params.id + '?access_token=' + this.access_token)
            .then((response) => response.json())
            .then((responseJson) => { this.setState(responseJson);
                console.log(responseJson); })
            .catch((error) => { console.error(error); });
    }

    /** Updates the name property of status */
    handleChangeName = (event) => {
        this.setState({ name: event.target.value });
    }

    /** Updates the budged property of status */
    handleChangeBudget = (event) => {
        this.setState({ budget: event.target.value });
    }

    /** Updates the address property of status */
    handleChangeAddress = (event) => {
        this.setState({ address: event.target.value });
    }

    /** Renders the vendor edit component */
    render() {
        return (
      <div className="vendoredit-component">
        <Grid>
          <Media>
            <Media.Left>
              <img  style={{clip: 'rect(0px,350px,200px,0px)', position: 'relative'}} width={350} src="https://i1.wp.com/onsunnyslopefarm.com/wp-content/uploads/2016/12/vendor-booth-10x20_4f317de637994db6183bdc59a72cee30.jpeg" alt="Image"/>
            </Media.Left>
            <Media.Body>
             <Grid>
              <ButtonToolbar>
                <Button onClick = { this.handleOk }><Glyphicon glyph="ok"/></Button>
              </ButtonToolbar>
              <Media.Heading>Name: {this.state.name}</Media.Heading>
                <FormGroup controlId = "formName">
                    <ControlLabel> Name </ControlLabel> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.name }
                    onChange = { this.handleChangeName }
                    />
                </FormGroup>
                <FormGroup controlId = "formAddress">
                    <ControlLabel> Address </ControlLabel> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.address }
                    onChange = { this.handleChangeAddress }
                    />
                </FormGroup>
                <ButtonToolbar>
                  <Button onClick = { this.handleOk }><Glyphicon glyph="ok"/></Button>
                </ButtonToolbar>
            </Grid>
            </Media.Body>
          </Media>
        </Grid>
      </div>
        );
    }
}

VendorEditComponent.displayName = 'VendorVendorEditComponent';

// Uncomment properties you need
// VendorEditComponent.propTypes = {};
// VendorEditComponent.defaultProps = {};

export default VendorEditComponent;

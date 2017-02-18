'use strict';

import React from 'react';

require('styles/product/ProductEdit.css');
import { Button, ButtonToolbar, FormGroup, ControlLabel, FormControl, Grid, Media, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class ProductEditComponent extends React.Component {

    constructor(props) {
        super(props);
        this.productURL = 'http://localhost:3000/api/products/';
        this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
        this.props = props;
        this.state = { id: 0, name: '', code: '', price: '', stock: '', description: '', img: '' };
    }
    handleClick = () => {
        var product = {
            id: this.state.id,
            name: this.state.name,
            code: this.state.code,
            price: this.state.price,
            description: this.state.description,
            stock: this.state.stock,
            img: this.state.img
        };

        fetch(this.productURL + this.state.id + '?access_token=' + this.access_token, {
                method: 'PUT',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify(product)
            }).then((response) => response.json())
            .then((responseJson) => { browserHistory.push('/product-show/' + this.state.id);})
            .catch((error) => { console.error(error); });
    };

    componentDidMount() {
        fetch(this.productURL + this.props.params.id + '?access_token=' + this.access_token)
            .then((response) => response.json())
            .then((responseJson) => { this.setState(responseJson);
                console.log(responseJson); })
            .catch((error) => { console.error(error); });
    }

    handleChangeName = (event) => {
        this.setState({ name: event.target.value });
    }

    handleChangeCode = (event) => {
        this.setState({ code: event.target.value });
    }

    handleChangePrice = (event) => {
        this.setState({ price: event.target.value });
    }

    handleChangeStock = (event) => {
        this.setState({ stock: event.target.value });
    }

    handleChangeDescription = (event) => {
        this.setState({ description: event.target.value });
    }

    handleChangeImg = (event) => {
        this.setState({ img: event.target.value });
    }

    render() {
        return (
      <div className="productedit-component">
        <Grid>
          <Media>
            <Media.Left>
              <img  style={{clip: 'rect(0px,350px,200px,0px)', position: 'relative'}} width={350} src={this.state.img} alt="Image"/>
            </Media.Left>
            <Media.Body>
             <Grid>
              <ButtonToolbar>
                <Button onClick = { this.handleClick }><Glyphicon glyph="ok"/></Button>
              </ButtonToolbar>
              <Media.Heading>Name: {this.state.name}</Media.Heading>
                <FormGroup controlId = "formName">
                    <ControlLabel> Name </ControlLabel> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.name }
                    onChange = { this.handleChangeName }
                    />
                </FormGroup>
                <FormGroup controlId = "formCode">
                    <ControlLabel> Code </ControlLabel> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.code }
                    onChange = { this.handleChangeCode }
                    />
                </FormGroup>
                <FormGroup controlId = "formPrice">
                    <ControlLabel> Price </ControlLabel> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.price }
                    onChange = { this.handleChangePrice }
                    />
                </FormGroup>
                <FormGroup controlId = "formImg">
                    <ControlLabel> Img </ControlLabel> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.img }
                    onChange = { this.handleChangeImg }
                    />
                </FormGroup>
                <FormGroup controlId = "formStock">
                    <ControlLabel> Stock </ControlLabel> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.stock }
                    onChange = { this.handleChangeStock }
                    />
                </FormGroup>
                <FormGroup controlId = "formDescription">
                    <ControlLabel> Description </ControlLabel> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.description }
                    onChange = { this.handleChangeDescription }
                    />
                </FormGroup>
                <ButtonToolbar>
                  <Button onClick = { this.handleClick }><Glyphicon glyph="ok"/></Button>
                </ButtonToolbar>
            </Grid>
            </Media.Body>
          </Media>
        </Grid>
      </div>
        );
    }
}

ProductEditComponent.displayName = 'ProductProductEditComponent';

// Uncomment properties you need
// ProductEditComponent.propTypes = {};
// ProductEditComponent.defaultProps = {};

export default ProductEditComponent;

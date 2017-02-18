'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

require('styles/product/ProductAdd.css');
import { Button, ButtonToolbar, FormGroup, ControlLabel, FormControl, Grid, Glyphicon} from 'react-bootstrap';

class ProductAddComponent extends React.Component {
    handleClick = () => {
        var product = {
            name: this.state.name,
            code: this.state.code,
            price: this.state.price,
            description: this.state.description,
            stock: this.state.stock,
            img: this.state.img
        };
        fetch(this.productURL + '?access_token=' + this.access_token, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify(product)
            }).then((response) => response.json())
            .then((responseJson) => { browserHistory.push('/product-list'); })
            .catch((error) => { console.error(error); });

    };

    handleGoList = () => {
        browserHistory.push('/product-list');
    };



    constructor() {
        super();
        this.productURL = 'http://localhost:3000/api/products';
        this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
        this.state = { name: '', code: '', price: '', stock: '', description: '', img: '' };
    };

    componentDidMount() {
        fetch(this.productURL + this.props.params.id + '?access_token=' + this.access_token)
            .then((response) => response.json())
            .then((responseJson) => { this.setState({ product: responseJson }); })
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
          <div className = "productadd-component">
            <Grid>
                <ButtonToolbar>
                <Button onClick = { this.handleClick }><Glyphicon glyph="ok"/></Button>
                <Button onClick = { this.handleGoList }><Glyphicon glyph="list"/></Button> 
                </ButtonToolbar>
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
                    <ControlLabel> Price </ControlLabel><FormControl type = "text"
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
                <Button onClick = { this.handleClick }><Glyphicon glyph="ok"/> </Button> <Button
                onClick = { this.handleGoList }><Glyphicon glyph="list"/></Button> </ButtonToolbar>
            </Grid>
            </div>
        );
    }
}

ProductAddComponent.displayName = 'ProductProductAddComponent';

// Uncomment properties you need
// ProductAddComponent.propTypes = {};
// ProductAddComponent.defaultProps = {};

export default ProductAddComponent;

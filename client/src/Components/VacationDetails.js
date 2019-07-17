import React from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {addVacation, editVacation} from "../Actions";
import {connect} from "react-redux";
import styled from "styled-components";

const moment = require('moment');
const _ = require('lodash');

class HandleVacation extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.handleClose = this.handleClose.bind(this);

        this.state = {

            currentImg: {},
            description: null,
            destination: null,
            img_url: null,
            from_date: null,
            to_date: null,
            price: null
        };
    }

    success() {
        const vacation = {description: this.state.description,destination: this.state.destination,img_url: this.state.currentImg.name,
            from_date: parseInt(moment(this.state.from_date).format('X')),to_date: parseInt(moment(this.state.to_date).format('X')),
            price: parseInt(this.state.price)};

        let x = new FormData();
        x.append('img', this.state.currentImg);
        x.append('vacation', JSON.stringify(vacation));

        this.props.mode ? this.props.addVacation(x) : this.props.editVacation(this.props.vacationId, x);
    }


    handleClose() {
        this.props.setShow({showVacationModal: false})
    }


    onChange(field, value) {
        this.setState({
            [field]: value
        })
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        {this.props.mode ? <Modal.Title>Add Vacation</Modal.Title> :
                            <Modal.Title>Edit Vacation</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="destination">
                                <Form.Control type="text" placeholder="Destination" value={this.state.destination}
                                              onChange={({target}) => this.onChange('destination', target.value)} />
                            </Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="fromDate">
                                        <Form.Label>From:</Form.Label>
                                        <Form.Control type="date" value={this.state.from_date}
                                                      onChange={({target}) => this.onChange('from_date', target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="toDate">
                                        <Form.Label>To:</Form.Label>
                                        <Form.Control type="date" value={this.state.to_date}
                                                      onChange={({target}) => this.onChange('to_date', target.value)} />
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Form.Group as={Row} controlId="price">
                                <Form.Label column sm="3">
                                    Price:
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" value={this.state.price} min="0" max="1000000"
                                                  onChange={({target}) => this.onChange('price', target.value)}  />
                                </Col>
                                <Form.Label column sm="1">
                                    $
                                </Form.Label>
                            </Form.Group>

                            <Form.Row>
                                <Col sm="4">
                            <Form.Group controlId="upload">
                                <Form.Label style={{display: "table", color: "#fff", backgroundColor: "#007bff",
                                    padding: ".375rem .75rem", border: "1px solid #ced4da",
                                    borderRadius: ".25rem", transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                                    cursor:"pointer"}}>Upload Image
                                    <input type="file" id="upload" accept="image/*" style={{display:"none"}}  onChange={({target})=>this.setState({
                                        currentImg: target.files[0],
                                        img_url: target.files[0].name})}/>
                                </Form.Label>
                            </Form.Group>
                                </Col>

                                {this.state.img_url ? <Col sm="8">
                                    <Form.Group controlId="selectedImg">
                                        <ImgDiv>{_.truncate(this.state.img_url,{"length":30})}</ImgDiv>
                                    </Form.Group>
                                </Col>: null}

                            </Form.Row>

                            <Form.Group controlId="description">
                                <Form.Label>Description (up to 250 characters):</Form.Label>
                                <Form.Control as="textarea" rows="3" value={this.state.description} maxlength="250"
                                              onChange={({target}) => this.onChange('description', target.value)} />
                            </Form.Group>
                        </Form>
                        <span style={{fontSize: "12px"}}>*all fields are required</span>
                        <br/>
                        <span style={{fontSize: "12px"}}>*'from' date must be earlier than 'to' date</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        {this.props.mode ? <Button variant="primary" onClick={()=>{this.handleClose(); this.success()}}>
                            Add </Button> : <Button variant="primary" onClick={()=>{this.handleClose(); this.success()}}>
                                Save Changes
                            </Button>}

                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    componentDidMount() {
        if(!_.isEmpty(this.props.vacation)){
            this.setState({
                description: this.props.vacation.description,
                destination: this.props.vacation.destination,
                img_url: this.props.vacation.img_url,
                from_date: moment.unix(this.props.vacation.from_date).format("YYYY-MM-DD"),
                to_date: moment.unix(this.props.vacation.to_date).format("YYYY-MM-DD"),
                price: this.props.vacation.price
            })
        }

    }
}



const mapDispatchToProps = dispatch => {
    return {
        addVacation: (vacation) => dispatch(addVacation(vacation)),
        editVacation: (vacationId, vacation) => dispatch(editVacation(vacationId, vacation))
    }
};

export default connect(null,mapDispatchToProps)(HandleVacation);


const ImgDiv = styled.div`
  width: 100%;
  padding: .375rem .75rem;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  color: black;
  display: inline-block;
  overflow-x: hidden;
`;

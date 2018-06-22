import * as React from 'react';
import { Link } from 'react-router-dom';
import {Col, Container, Row} from 'reactstrap';
import { Nav, NavItem} from 'reactstrap';
import {Button,Input,InputGroup, InputGroupAddon} from 'reactstrap';
import axios from 'axios';


export class SidebarComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public updateInput = (e: any) => {
    const input = e.target.value;
    this.props.updateInput(input);
  }

  public searchItemsByTitle = (e:any)=>{
    console.log(e);
    console.log(this.props.input);  // SCX2000 Desk Chair
    const url = 'https://owdw8b3ri4.execute-api.us-east-2.amazonaws.com/dev/items/'+`${this.props.input.replace(/ /g, '+')}`
    console.log(url);
    axios.get(url)
    .then((data)=>{
      console.log(data.data);
      
      this.props.updateItems(data.data);

      this.props.history.push('/display-item')
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  public render() {
    return (
      <div id="sidebar">
        <Container>
          <br/>
          <Row className="justify-content-center">
            <Col>
              <InputGroup size="sm">
                <Input 
                  value ={this.props.input}
                  onChange={this.updateInput}
                />
                <InputGroupAddon addonType="append">
                  <Button color="secondary"
                  onClick = {this.searchItemsByTitle}
                  >i</Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
         
        <Row className="justify-content-center">
          <Nav vertical={true}>
            <NavItem>
              <Link to="/test" className="unset-anchor nav-link">Test</Link>
            </NavItem>
            <NavItem>
              <Link to="/test2" className="unset-anchor nav-link">Test2</Link>
            </NavItem>
            <NavItem>
              <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
            </NavItem>
            <NavItem>
              <Link to="/register" className="unset-anchor nav-link">Register</Link>
            </NavItem>
            <NavItem>
              <Link to="/create-item" className="unset-anchor nav-link">Create Item</Link>
            </NavItem>
            <NavItem>
              <Link to="/display-item" className="unset-anchor nav-link">Display Item</Link>
            </NavItem>
            <NavItem>
              <Link to="/categories" className="unset-anchor nav-link">Categories</Link>
            </NavItem>
          </Nav>
        </Row>
        </Container>
      </div>
    );
  }
}
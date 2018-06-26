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
    console.log(this.props.input); 
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
                  ><i className="fa fa-search" aria-hidden="true"></i></Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
         
        <Row>
          <Nav vertical={true}>
            <NavItem>
              <Link to="/sign-in" className="unset-anchor nav-link"><span><i className="fa fa-sign-in" aria-hidden="true"></i></span> Sign In</Link>
            </NavItem>
            <NavItem>
              <Link to="/register" className="unset-anchor nav-link"><span><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span> Register</Link>
            </NavItem>
            <NavItem>
              <Link to="/create-item" className="unset-anchor nav-link"><span><i className="fa fa-plus-square" aria-hidden="true"></i></span> Create Item</Link>
            </NavItem>
            <NavItem>
              <Link to="/categories" className="unset-anchor nav-link"><span><i className="fa fa-cubes" aria-hidden="true"></i></span> Categories</Link>
            </NavItem>
            <div>test</div>
          </Nav>
        </Row>
        </Container>
      </div>
    );
  }
}
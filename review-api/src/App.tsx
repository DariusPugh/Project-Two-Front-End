import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {Col, Container, Row} from 'reactstrap';
import './App.css';
import {Sidebar} from './components/sidebar/sidebar.component'
import {TestComponent} from './components/test/test.component';
import {TestComponent2} from './components/test/test2.component';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <HashRouter>
          <div>
          <Container id="appContainer">
            <Row>
            <Col xs="3">
                <Sidebar/>
            </Col>
            <Col>
                <Switch>
                  <Route path="/test" component={TestComponent} />
                  <Route path="/test2" component={TestComponent2} />
                </Switch>
            </Col>
            </Row>
          </Container>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;

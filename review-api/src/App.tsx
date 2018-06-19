import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './App.css';
import { store } from './Store';
import { SidebarContainer } from './components/sidebar/sidebar.cotainer';
import { TestComponent } from './components/test/test.component';
import { TestComponent2 } from './components/test/test2.component';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
          <Container id="appContainer">
            <Row>
            <Col xs="3">
                <SidebarContainer/>
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
        </Provider>
    );
  }
}

export default App;

import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './App.css';
import { store } from './Store';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { DisplayItemsContainer } from './components/display-items-name/display-item.container';
import { RegisterComponent } from './components/register/register.component';
import { SidebarContainer } from './components/sidebar/sidebar.cotainer';
import { SignInContainer } from './components/sign-in/sign-in.container';
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
              <Route><SidebarContainer/></Route>
            </Col>
            <Col>
                <Switch>
                  <Route path="/test" component={TestComponent} />
                  <Route path="/test2" component={TestComponent2} />
                  <Route path="/sign-in" component={SignInContainer} />
                  <Route path="/register" component={RegisterComponent} />
                  <Route path="/create-item" component={CreateItemComponent} />
                  <Route path="/display-item" component={DisplayItemsContainer} />
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

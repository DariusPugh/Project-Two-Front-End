import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './App.css';
import { store } from './Store';
import { CreateItemContainer } from './components/create-item/create-item.container';
import { DisplayItemsContainer } from './components/display-items-name/display-item.container';
import { RegisterContainer } from './components/register/register.container';
import { SidebarContainer } from './components/sidebar/sidebar.cotainer';
import { SignInContainer } from './components/sign-in/sign-in.container';
// import { HomeComponent } from './components/home/home.component';
import { CategoryListContainer } from './components/category-list/categories.container';
import { ItemListContainer } from './components/item-list/items.container';
import { ReviewListContainer } from './components/review-list/reviews.container';
import { ReviewContainer } from './components/review/review.container';
import { ComposeContainer } from './components/compose-review/compose.container';
import { CreateCategoryContainer } from './components/create-category/category.container';


class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
          <Container id="appContainer">
            <Row>
            <Col xs="3" lg="2" id="sidebarColumn">
              <Route component={SidebarContainer}/> 
            </Col>
            <Col id="switch-block">
                <Switch>
                  {/* <Route path="/home" component={HomeComponent} /> */}
                  <Route path="/sign-in" component={SignInContainer} />
                  <Route path="/register" component={RegisterContainer} />
                  <Route path="/categories/create" component={CreateCategoryContainer}/>
                  <Route path="/categories/:category/create" component={CreateItemContainer} />
                  <Route path="/categories/:category/:item/review" component={ComposeContainer} />
                  <Route path="/display-item" component={DisplayItemsContainer} />
                  <Route path="/categories/:category/:item/r/:rID" component={ReviewContainer} />
                  <Route path="/categories/:category/:item" component={ReviewListContainer}/>
                  <Route path="/categories/:category" component={ItemListContainer}/>
                  <Route path="/categories" component={CategoryListContainer} />
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

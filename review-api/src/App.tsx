import * as React from 'react';
import { Component } from 'react';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { CategoryListComponent } from './components/category-list/categories.component';
import { ItemListComponent } from './components/item-list/items.component';
import { ReviewListComponent } from './components/review-list/reviews.component';

class App extends Component {
  public render() {
    return (
      <HashRouter>
        <Switch>
        {/*<Route path="/:category/:item/review" component={ReviewWriteComponent  />*/}
        {/*<Route path="/:category/:item/:rID" component={ ReviewViewComponent  />*/}
        <Route path="/:category/:item" component={ReviewListComponent} />
        <Route path="/:category/view" component={ItemListComponent} />
        <Route path="/categories" component={CategoryListComponent} />        
        </Switch>
      </HashRouter>
    );
  }
}

export default App;

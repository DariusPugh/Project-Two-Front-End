import * as React from 'react';
import * as netService from '../../net-service/netService'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
// import { environment } from '../../environment';

export class CategoryListComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            categoryList: new Array(),
        }
    }

    public componentDidMount() {
        netService.getData('/categories')
            .then((data) => {
                const categories = data.data;
                this.setState({
                    categoryList: categories,
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    public render() {
        return (
            <div id="category-list-wrapper">
                <ListGroup>
                    {this.state.categoryList.map((category:any, i:any) => {
                        // style this as a link
                        return (
                            <ListGroupItem key={i} className="list-group-item d-flex justify-content-between align-items-center list-group-item list-group-item-dark" onClick={this.selectCategory} id={category.category}><span><img src="https://images.pexels.com/photos/33537/cat-animal-cat-portrait-mackerel.jpg?auto=compress&cs=tinysrgb&h=350" alt=""/></span>{category.category}<Badge pill>{category.count}</Badge></ListGroupItem>
                            // <div key={i} className="link" onClick={this.selectCategory} id={category.category}>{category.category}</div>
                        );
                    })}
                </ListGroup>
            </div>
        );
    }

    public selectCategory = (e:any) => {
        const cat = e.target.id;
        this.props.updateCategory(cat);
        this.props.history.push(`/categories/${cat}`);
    }
}
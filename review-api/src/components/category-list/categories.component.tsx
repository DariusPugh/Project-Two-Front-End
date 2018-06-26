import * as React from 'react';
import * as netService from '../../net-service/netService'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
// import { environment } from '../../environment';

export class CategoryListComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            categoryList: new Array(),
            role: ''
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
        if (this.props.cognitoUser.user) {
            netService.getData(`/user/${this.props.cognitoUser.user.getUsername()}`)
                .then((data) => {
                    this.setState({
                        ...this.state,
                        role: data.data.role,
                    });
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    public render() {
        return (
            <div id="category-list-wrapper">
                <ListGroup>
                {this.createCategoryButton()}
                {this.state.categoryList.map((category:any, i:any) => {
                    // style this as a link
                    return (
                        <div key={i}>
                        <div className="link" onClick={this.selectCategory} id={category.category}>{category.category}</div>
                        {this.deleteCategoryButton(i)}
                        </div>
                    );
                })}
                </ListGroup>
            </div>
        );

    }

    private deleteCategoryButton = (i:string) => {
        if (this.state.role === 'admin') {
            return (
                <button className="btn btn-default text-right" id={i} role="button" onClick={this.delCategory} type="button">Delete Category</button>
            );
        }
        return;
    }

    private createCategoryButton = () => {
        if (this.state.role === 'admin') {
            return (
                <button className="btn btn-default text-right" role="button" onClick={this.create} type="button">New Category</button>
            );
        }
        return;
    }

    private create = () => {
        this.props.history.push('/categories/create');
    }

    private delCategory = (e:any) => {
        const cat = this.state.categoryList[parseInt(e.target.id, 10)];
        netService.delData(`/categories/${cat.category}`)
            .then((data) => {
                this.componentDidMount();
            }).catch((err) => {
                console.log(err);
            });
    }

    private selectCategory = (e:any) => {
        const cat = e.target.id;
        this.props.updateCategory(cat);
        this.props.history.push(`/categories/${cat}`);
    }
}
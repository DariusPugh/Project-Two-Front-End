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
                        {/* <div className="link" onClick={this.selectCategory} id={category.category}>{category.category}</div> */}
                        <ListGroupItem key={i} className="list-group-item d-flex justify-content-between align-items-center list-group-item list-group-item-dark" onClick={this.selectCategory} id={category.category}>
                        <span>
                            <img src={this.getCatImage(i)} alt=""/>
                        </span>{category.category}
                        <Badge pill>{category.count}</Badge>
                        {this.deleteCategoryButton(i)}
                        </ListGroupItem>
                        
                        </div>
                    );
                })}
                </ListGroup>
            </div>
        );

    }

    private getCatImage = (i:any) => {
        if (this.state.categoryList[i].image) {
            return this.state.categoryList[i].image;
        }
        return "https://screenshotlayer.com/images/assets/placeholder.png";
    }

    private deleteCategoryButton = (i:string) => {
        if (this.state.role === 'admin') {
            return (
                <button type="button" className="btn transparent-btn" aria-label="Left Align" id={i} onClick={this.delCategory}>
                    <img className="del-icon" src='https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/010_trash-2-512.png'id={i}/>
                </button>
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
        const ev = e || window.event;
        ev.stopPropagation();
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
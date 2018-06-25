import * as React from 'react';
import * as netService from '../../net-service/netService'
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
            <div>
                {this.createCategoryButton()}
                {this.state.categoryList.map((category:any, i:any) => {
                    // style this as a link
                    return (
                        <div key={i} className="link" onClick={this.selectCategory} id={category.category}>{category.category}</div>
                    );
                })}
            </div>
        );
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

    private selectCategory = (e:any) => {
        const cat = e.target.id;
        this.props.updateCategory(cat);
        this.props.history.push(`/categories/${cat}`);
    }
}
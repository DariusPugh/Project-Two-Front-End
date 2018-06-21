import * as React from 'react';
import * as netService from '../../net-service/netService'
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
            <div>
                {this.state.categoryList.map((category:any, i:any) => {
                    // style this as a link
                    return (
                        <div key={i} className="link" onClick={this.selectCategory} id={category.category}>{category.category}</div>
                    );
                })}
            </div>
        );
    }

    public selectCategory = (e:any) => {
        const cat = e.target.id;
        this.props.updateCategory(cat);
        this.props.history.push(`/categories/${cat}`);
    }
}
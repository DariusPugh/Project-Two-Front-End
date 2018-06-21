import * as React from 'react';
import * as netService from '../../net-service/netService';
// import { environment } from '../../environment';

export class ItemListComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            itemList: new Array(),
        }
    }

    public componentDidMount() {
        // call server to get the component list
        let category;
        if (this.props.category.category) {
            category = this.props.category.category;
        } else {
            const splitPath = this.props.location.pathname.split('/');
            category = splitPath[splitPath.length-1];
        }
        netService.getData(`/categories/${category}`)
                .then((data) => {
                    const items = data.data;
                    this.setState({
                        ...this.state,
                        itemList: items,
                    });
                }).catch((err) => {
                    console.log(err);
                });
    }

    public render() {
        return (
            <div>
                {this.state.itemList.map((item:any, i:any) => {
                    // style this as a link
                    return (
                        <div key={i} className="link" onClick={this.updateTitle} id={item.title}>{item.title}</div>
                    );
                })}
            </div>
        );
    }

    private updateTitle = (e:any) => {
        const title = e.target.id;
        this.props.updateTitle(title);
        let category;
        if (this.props.category.category) {
            category = this.props.category.category;
        } else {
            const splitPath = this.props.location.pathname.split('/');
            category = splitPath[splitPath.length-1];
        }
        this.props.history.push(`/categories/${category}/${title}`);
    }
}
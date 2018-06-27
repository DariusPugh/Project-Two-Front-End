import * as React from 'react';
import * as netService from '../../net-service/netService';
// import { environment } from '../../environment';

export class ItemListComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            itemList: new Array(),
            role: '',
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
                {this.newItemButton()}
                {this.state.itemList.map((item:any, i:any) => {
                    // style this as a link
                    return (
                        <div key={i}>
                            <div className="link" onClick={this.updateTitle} id={item.title}>{item.title}</div>
                            {this.deleteItemButton(i)}
                        </div>
                    );
                })}
            </div>
        );
    }

    private deleteItemButton = (i:string) => {
        if (this.state.role === 'admin') {
            return (
                <div>
                <button className="btn btn-default text-right" id={i} role="button" onClick={this.delItem} type="button">Delete Item</button>
                </div>
            );
        }
        return;
    }

    private newItemButton = () => {
        if (this.state.role === 'admin') {
            return (
                <div>
                <button className="btn btn-default text-right" role="button" onClick={this.create} type="button">New Item</button>
                </div>
            );
        }
        return;
    }

    private delItem = (e:any) => {
        const item = this.state.itemList[parseInt(e.target.id, 10)];
        netService.delData(`/categories/${item.category}/${item.title}`)
            .then((data) => {
                this.componentDidMount();
            }).catch((err) => {
                console.log(err);
            })
    }

    private create = () => {
        let category;
        if (this.props.category.category) {
            category = this.props.category.category;
        } else {
            const splitPath = this.props.location.pathname.split('/');
            category = splitPath[splitPath.length-1];
        }
        this.props.history.push(`/categories/${category}/create`);
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
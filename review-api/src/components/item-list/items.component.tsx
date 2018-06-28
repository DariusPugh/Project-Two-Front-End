import * as React from 'react';
import * as netService from '../../net-service/netService';
import { ListGroup , ListGroupItem } from 'reactstrap';
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
        const splitPath = this.props.location.pathname.split('/');
        category = splitPath[splitPath.length-1];
        this.props.updateCategory(category);
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
        /*return (
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
        );*/

    return (
        <div>
            <button className="btn btn-default text-right" role="button" onClick={this.back} type="button">Category List</button>
            <p/>
            <ListGroup>
            {this.newItemButton()}
            {this.state.itemList.map((item:any,i:number) =>{
                return(
                <ListGroupItem key={"list"+i} className="list-group-item d-flex justify-content-between align-items-center list-group-item list-group-item-dark">
                    <div className="container-fluid" key={"container" + i}>
                    <div className="row" onClick={() => this.updateTitle(item)}>
                        <div className="col-2">
                        <span><img src={this.getImage(i)} alt=""/></span>
                        </div>
                        <div className="col-sm-10">
                        <div id="display-list-title" className = "row">
                            <strong>{item.title}</strong>
                        </div>
                        <div className = "row">
                            Category: {item.category}
                        </div>
                        <div className = "row" >
                            Description: <em>{item.description}</em>
                        </div>
                        <div className = "row">
                            Average Score: {item.averageScore}
                        </div>
                        </div>
                        <div className="col">
                        {this.deleteItemButton(i)}
                        </div>
                    </div>
                    
                    </div>
                </ListGroupItem>
                )
            })}
            </ListGroup>
        </div>
        );
    }

    private back = () => {
        this.props.history.push(`/categories`);
    }

    private getImage = (i:number) => {
        if (this.state.itemList[i].image) {
            return this.state.itemList[i].image;
        }
        return "https://screenshotlayer.com/images/assets/placeholder.png";
    }

    private deleteItemButton = (i:number) => {
        if (this.state.role === 'admin') {
            return (
                <button type="button" className="btn transparent-btn" aria-label="Left Align" id={`${i}`} onClick={this.delItem}>
                    <img className="del-icon" src='https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/010_trash-2-512.png'id={`${i}`}/>
                </button>
            );
        }
        return;
    }

    private newItemButton = () => {
        if (this.state.role === 'admin') {
            return (
                <button className="btn btn-default text-right" role="button" onClick={this.create} type="button">New Item</button>
            );
        }
        return;
    }

    private delItem = (e:any) => {
        const ev = e || window.event;
        ev.stopPropagation();
        const item = this.state.itemList[parseInt(e.target.id, 10)];
        netService.delData(`/categories/${item.category}/${item.title}`)
            .then((data) => {
                this.componentDidMount();
            }).catch((err) => {
                console.log(err);
            })
    }

    private create = () => {
        this.props.history.push(`/categories/${this.props.category.category}/create`);
    }

    private updateTitle = (item:any) => {
        const title = item.title;
        this.props.updateTitle(title);
        this.props.history.push(`/categories/${this.props.category.category}/${title}`);
    }
}
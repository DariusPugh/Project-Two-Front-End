import * as React from 'react';
import * as netService from '../../net-service/netService';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { ModalComponent } from '../modal-user-profile/modal-user-profile.component';

export class ReviewComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            btn: [],
            child: React.createRef(),
            comment: '',
            openModal: false,
            review: {
                comments: [],
            },
            role: '',
            
        }
    }

    public componentDidMount() {
        let rid;
        const splitPath = this.props.location.pathname.split('/');
        rid = splitPath[splitPath.length-1];
        this.props.updateReviewID(rid);
        netService.getData(`/review/${rid}`)
                .then((data) => {
                    this.setState({
                        ...this.state,
                        review: data.data[0],
                    });
                    console.log(this.state.review);
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

    public onRunClick(act:any,index:any,e:any){
        this.state.btn[index].toggle();
    }



    public modalHandler= (e:any)=>{
        e.stopPropagation();
        this.state.child.current.toggle();
    }

    public render() {
        return (
            <div>
                
                <ListGroup>
                    <ListGroupItem className="list-group-item d-flex justify-content-between align-items-center list-group-item transparent-list-group">
                        <button className="btn btn-default text-right" role="button" onClick={this.back} type="button">{this.state.review.title}</button>
                        <p/>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item d-flex justify-content-between align-items-center list-group-item transparent-list-group">
                        <div className="row">
                            <div id="display-list-title" className = "col"
                                 onClick={this.modalHandler}
                            >
                                <strong id={this.state.review.username}>{this.state.review.username}</strong>
                            </div>
                            <div className="col">
                            <ModalComponent  ref={this.state.child}  buttonLabel="View Profile" modalState={this.state.openModal} usernameModal ={this.state.review.username} updateTitle={this.props.updateTitle} updateCategory={this.props.updateCategory} history={this.props.history}/>
                            </div>
                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item d-flex justify-content-between align-items-center list-group-item transparent-list-group">
                        <div>{'Score: ' + this.state.review.score}</div>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item d-flex justify-content-between align-items-center list-group-item transparent-list-group">
                        <p>{this.state.review.body}</p>
                    </ListGroupItem>
                </ListGroup>
                <p/>
                <p/>
                <p/>
                <ListGroup>
                {this.state.review.comments.map((item:any, i:any) => {
                    const boundActRunClick = this.onRunClick.bind(this, item ,i)
                    return (
                        <ListGroupItem key={"list"+i} className="list-group-item d-flex justify-content-between align-items-center list-group-item transparent-list-group">
                        <div className="container-fluid" key={"container" + i}>
                            <div className="row" key={"row"+i}>
                            <div className="col-sm-10">
                            <div id="display-list-title" className = "row"
                                onClick={boundActRunClick}
                            >
                            <strong id={item.username}>{item.username}</strong>
                            </div>
                            <div className = "row" id={i} >
                                {item.message}
                            </div>
                            </div>
                            </div>
                            </div>
                        <div className="col">
                                {this.deleteCommentButton(i)}
                        </div>
                        <div className="col">
                         <ModalComponent key={"reviews-modal"+i} ref={(ref:any)=>this.state.btn[i]=ref} id={"modal-id"+i} buttonLabel="View Profile" modalState={this.state.openModal} usernameModal ={item.username} updateTitle={this.props.updateTitle} updateCategory={this.props.updateCategory} history={this.props.history}/>
                        </div>
                    </ListGroupItem>
                    );
                })}
                </ListGroup>
                {this.commentBox()}
            </div>
        );
    }

    private deleteCommentButton = (i:any) => {
        if (this.state.role === 'admin' && (this.state.review.comments[i].message !== "<message deleted>" || this.state.review.comments[i].username !== " ")) {
            return (
                <button className="btn btn-default text-right" id={i} role="button" onClick={this.delComment} type="button">Delete Comment</button>
            );
        }
        return;
    }

    private delComment = (e:any) => {
        netService.putData(`/review/${this.state.review.reviewID}`, {index: parseInt(e.target.id, 10)})
            .then((data) => {
                this.componentDidMount();
            }).catch((err) => {
                console.log(err);
            })
    }

    private back = () => {
        this.props.history.push(`/categories/${this.state.review.category}/${this.state.review.title}`);
    }

    private commentBox = () => {
        if (this.props.cognitoUser.user) {
            return (
                <div>
                <div className="form-group">
                    <div>Comment:</div>
                    <textarea name="body" className="form-control" rows={3} id="comment" placeholder="Post a comment on this review." onChange={this.inputChange} value={this.state.comment}/>
                </div>
                <button className="btn btn-default text-right" role="button" onClick={this.submit} type="button">Submit</button>
                </div>
            );
        }
        return;
    }

    private submit = () => {
        if (this.state.comment) {
            const com = {
                message: this.state.comment,
                username: this.props.cognitoUser.user.getUsername(),
            }
            netService.postData(`/review/${this.state.review.reviewID}`, com)
                .then((data) => {
                    const comments = this.state.review.comments;
                    comments.push(com);
                    const rev = this.state.review;
                    rev.comments = comments;
                    this.setState({
                        ...this.state,
                        comment: '',
                        review: rev,
                    });
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    private inputChange = (e:any) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }
}
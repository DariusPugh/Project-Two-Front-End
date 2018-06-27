import * as React from 'react';
import * as netService from '../../net-service/netService';

export class ReviewComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            comment: '',
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
                        review: data.data[0],
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
                <div>{this.state.review.username}</div>
                <div>{this.state.review.score}</div>
                <p>{this.state.review.body}</p>
                {this.state.review.comments.map((item:any, i:any) => {
                    return (
                        <div key={i}>
                            <div>{item.username}</div>
                            <div>{item.message}</div>
                            {this.deleteCommentButton(i)}
                        </div>
                    );
                })}
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
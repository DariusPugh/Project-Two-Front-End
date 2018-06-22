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
        }
    }

    public componentDidMount() {
        let rid;
        if (this.props.review.reviewID) {
            rid = this.props.review.reviewID;
        } else {
            const splitPath = this.props.location.pathname.split('/');
            rid = splitPath[splitPath.length-1];
        }
        netService.getData(`/review/${rid}`)
                .then((data) => {
                    this.setState({
                        review: data.data[0],
                    });
                }).catch((err) => {
                    console.log(err);
                });
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
                        </div>
                    );
                })}
                <div className="form-group">
                    <div>Comment:</div>
                    <textarea name="body" className="form-control" rows={3} id="comment" placeholder="Post a comment on this review." onChange={this.inputChange} value={this.state.comment}/>
                </div>
                <button className="btn btn-default text-right" role="button" onClick={this.submit} type="button">Submit</button>
            
            </div>
        );
    }

    private submit = () => {
        if (this.state.comment) {
            let rid;
            if (this.props.review.reviewID) {
                rid = this.props.review.reviewID;
            } else {
                const splitPath = this.props.location.pathname.split('/');
                rid = splitPath[splitPath.length-1];
            }
            const com = {
                message: this.state.comment,
                username: /* getusername from logged in state */ 'Dynamo',
            }
            netService.postData(`/review/${rid}`, com)
                .then((data) => {
                    const comments = this.state.review.comments;
                    comments.push({
                        message: this.state.comment,
                        username: /* get username from logged in state */ 'Dynamo',
                    });
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
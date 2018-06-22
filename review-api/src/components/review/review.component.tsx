import * as React from 'react';
import * as netService from '../../net-service/netService';

export class ReviewComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            review: {
                comments: [],
            },
        }
    }

    public componentDidMount() {
        let rid;
        if (this.props.category.category && this.props.item.title && this.props.review.reviewID) {
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
            </div>
        );
    }
}
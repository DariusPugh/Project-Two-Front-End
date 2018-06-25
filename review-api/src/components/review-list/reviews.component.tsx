import * as React from 'react';
import * as netService from '../../net-service/netService';
// import { environment } from '../../environment';

export class ReviewListComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            item: {
                avgScore: '',
                description: '',
                title: '',
            },
            reviewList: new Array(),
        }
    }

    public componentDidMount() {
        // call server to get the component list
        let category;
        let title;
        if (this.props.category.category && this.props.item.title) {
            category = this.props.category.category;
            title = this.props.item.title;
        } else {
            const splitPath = this.props.location.pathname.split('/');
            category = splitPath[splitPath.length-2];
            title = splitPath[splitPath.length-1];
        }
        netService.getData(`/categories/${category}/${title}`)
            .then((data) => {
                const item = data.data[0];

                const reviews = item.reviews;
                const reviewDetails = new Array();
                this.setState({
                    ...this.state,
                    item: {
                        avgScore: item.averageScore,
                        description: item.description,
                        title: item.title,
                    }
                });

                for (let i = 0; i < reviews.length; i++) {
                    netService.getData(`/review/${reviews[i]}`)
                    .then((resp) => {
                        const review = resp.data[0];
                        let short = review.body;
                        if (short.length > 25) {
                            short = `${short.substring(0,24)}...`;
                        }
                        reviewDetails.push({
                            commentCount: review.comments.length,
                            reviewID: review.reviewID,
                            score: review.score,
                            summary: short,
                            username: review.username,
                        });
                        this.setState({
                            ...this.state,
                            reviewList: reviewDetails,
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                }     
            }).catch((err) => {
                console.log(err);
            });
    }

    public render() {
        return (
            <div>
                <div>{'Title:' + this.state.item.title}</div>
                <div>{'Score:' + this.state.item.avgScore}</div>
                <div>{'Description:' + this.state.item.description}</div>
                {this.reviewThisButton()}
                {this.state.reviewList.map((review:any, i:any) => {
                    // style this as a link
                    return (
                        <div key={i} className="link" onClick={this.updateReview} id={review.reviewID}>{this.state.reviewList[i].username}</div>
                    );
                })}
            </div>
        );
    }

    private reviewThisButton = () => {
        if (this.props.cognitoUser.user) {
            return (
                <button className="btn btn-default text-right" role="button" onClick={this.toReview} type="button">Review this!</button>
            );
        } 
        return;
    }

    private toReview = () => {
        let category;
        let title;
        if (this.props.category.category && this.props.item.title) {
            category = this.props.category.category;
            title = this.props.item.title;
        } else {
            const splitPath = this.props.location.pathname.split('/');
            category = splitPath[splitPath.length-2];
            title = splitPath[splitPath.length-1];
        }
        this.props.history.push(`/categories/${category}/${title}/review`);
    }

    private updateReview = (e:any) => {
        const rid = e.target.id;
        this.props.updateReviewID(rid);
        let category;
        let title;
        if (this.props.category.category && this.props.item.title) {
            category = this.props.category.category;
            title = this.props.item.title;
        } else {
            const splitPath = this.props.location.pathname.split('/');
            category = splitPath[splitPath.length-2];
            title = splitPath[splitPath.length-1];
        }
        this.props.history.push(`/categories/${category}/${title}/r/${rid}`);
    }
}

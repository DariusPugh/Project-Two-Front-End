import * as React from 'react';
import * as netService from '../../net-service/netService';
// import { environment } from '../../environment';
import {ModalComponent} from '../modal-user-profile/modal-user-profile.component'

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
            userReview: ''
        }
    }

    public componentDidMount() {
        // call server to get the component list
        let cat;
        let titl;
        if (this.props.category.category && this.props.item.title) {
            cat = this.props.category.category;
            titl = this.props.item.title;
        } else {
            const splitPath = this.props.location.pathname.split('/');
            cat = splitPath[splitPath.length-2];
            titl = splitPath[splitPath.length-1];
        }
        netService.getData(`/categories/${cat}/${titl}`)
            .then((data) => {
                const item = data.data[0];

                const reviews = item.reviews;
                const reviewDetails = new Array();
                this.setState({
                    ...this.state,
                    item: {
                        avgScore: item.averageScore,
                        category: item.category,
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

    public modalHandler= ()=>{
        this.setState({
            ... this.state,
            openModal:true,
        })
    }

    public render() {
        return (
            <div>
                <div>{'Title:' + this.state.item.title}</div>
                <div>{'Score:' + this.state.item.avgScore}</div>
                <div>{'Description:' + this.state.item.description}</div>
                <div key={"item-container"} className="container">
                {this.reviewThisButton()}
                {this.editThisButton()}
                {this.state.reviewList.map((review:any, i:any) => {
                    // style this as a link
                    return (
                            <div className="row" key={"row"+i}>
                                <hr/>
                                <div className="col">
                                    <div key={i} className="link" onClick={this.updateReview} id={review.reviewID}>{this.state.reviewList[i].username}</div>
                                    {this.deleteReviewButton(i)}
                                </div>
                                <div className="col">
                                 <ModalComponent buttonLabel="View Profile" usernameModal ={this.state.reviewList[i].username} history={this.props.history}/>
                                </div>
                                <hr/>
                            </div>
                            
                    );
                })}
                </div>
            </div>
        );
    }

    private deleteReviewButton = (i:string) => {
        if (this.state.role === 'admin') {
            return (
                <button className="btn btn-default text-right" id={i} role="button" onClick={this.delReview} type="button">Delete Review</button>
            );
        } 
        return;
    }

    private editThisButton = () => {
        if (this.state.role === 'admin') {
            return (
                <button className="btn btn-default text-right" role="button" onClick={this.editItem} type="button">Edit Item</button>
            );
        } 
        return;
    }

    private editItem = () => {
        this.props.history.push(`/categories/${this.state.item.category}/${this.state.item.title}/edit`)
    }

    private reviewThisButton = () => {
       if (this.props.cognitoUser.user) {
            return (
                <button className="btn btn-default text-right" role="button" onClick={this.toReview} type="button">Review this!</button>
            );
        } 
        return;
    }

    private delReview =(e:any) => {
        const i = parseInt(e.target.id, 10);
        netService.delBody(`/review/${this.state.reviewList[i].reviewID}`, {
            index: i
        }).then((data) => {
            // this.componentDidMount();
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
            this.props.history.push('/');
            this.props.history.push(`/categories/${category}/${title}`);
        }).catch((err) => {
            console.log(err);
        });
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
        this.props.updateCategory(category);
        this.props.updateTitle(title);
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

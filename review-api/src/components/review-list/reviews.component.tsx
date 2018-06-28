import * as React from 'react';
import * as netService from '../../net-service/netService';
// import { environment } from '../../environment';
import { ListGroup , ListGroupItem } from 'reactstrap';
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

    public componentDidUpdate(prevProps:any, prevState:any) {
            // only update chart if the data has changed
        if (prevProps.category !== this.props.category || prevProps.title !== this.props.title) {
            if (this.props.category.category && this.props.item.title) {
                this.setup();
            }
        }
      }


    public componentDidMount() {
        // call server to get the component list
        let cat;
        let titl;
        const splitPath = this.props.location.pathname.split('/');
        cat = splitPath[splitPath.length-2];
        titl = splitPath[splitPath.length-1];

        if (this.props.item.title !== titl) {
            this.props.updateTitle(titl);
        }
        if (this.props.category.category !== cat) {
            this.props.updateCategory(cat);
        }
        this.setup(); 
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
                <img src={this.state.item.image}/>
                <div>{'Title:' + this.state.item.title}</div>
                <div>{'Score:' + this.state.item.avgScore}</div>
                <div>{'Description:' + this.state.item.description}</div>
                {this.reviewThisButton()}
                {this.editThisButton()}
                <div>
                <ListGroup>
                
                {this.state.reviewList.map((review:any, i:any) => {
                    // style this as a link
                    return (
                        <ListGroupItem key={"list"+i} className="list-group-item d-flex justify-content-between align-items-center list-group-item list-group-item-dark">
                        <div className="container-fluid" key={"container" + i}>
                            <div className="row" key={"row"+i} onClick={(e) => this.updateReview(review.reviewID)}>
                            <div className="col-sm-10">
                            <div id="display-list-title" className = "row">
                            <strong id={review.reviewID}>{review.username}</strong>
                            </div>
                            <div className = "row" id={review.reviewID} >
                                Score: {review.score}
                            </div>
                            <div className = "row" id={review.reviewID} >
                                Description: <em id={review.reviewID}>{review.summary}</em>
                            </div>
                            </div>
                            <div className="col">
                                {this.deleteReviewButton(i)}
                            </div>
                            
                            <div className="col">
                                <ModalComponent buttonLabel="View Profile" usernameModal ={this.state.reviewList[i].username} updateTitle={this.props.updateTitle} updateCategory={this.props.updateCategory} history={this.props.history}/>
                            </div>
                                
                            </div>
                        </div>
                    </ListGroupItem>
                            
                    );
                })}
                </ListGroup>
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
            this.props.history.push('/');
            this.props.history.push(`/categories/${this.props.category.category}/${this.props.item.title}`);
        }).catch((err) => {
            console.log(err);
        });
    }

    private toReview = () => {
        this.props.history.push(`/categories/${this.props.category.category}/${this.props.item.title}/review`);
    }

    private updateReview = (e:any) => {
        const rid = e;
        this.props.updateReviewID(rid);
        this.props.history.push(`/categories/${this.props.category.category}/${this.props.item.title}/r/${rid}`);
    }

    private setup = () => {
        netService.getData(`/categories/${this.props.category.category}/${this.props.item.title}`)
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
    }
}

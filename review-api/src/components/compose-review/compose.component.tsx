import * as React from 'react';
import * as netService from '../../net-service/netService';

export class ComposeComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            body: '',
            edit: false,
            score: '',
        }
    }
    
    public componentDidMount() {
       if (!this.props.cognitoUser.user) {
            this.props.history.push('');
            
        } else {
            let cat;
            let titl;
            const splitPath = this.props.location.pathname.split('/');
            cat = splitPath[splitPath.length-3];
            titl = splitPath[splitPath.length-2];
            this.props.updateTitle(titl);
            this.props.updateCategory(cat);
            netService.putData('/review', {
                    category: cat,
                    title: titl,
                    username: this.props.cognitoUser.user.getUsername(),
                }).then((data) => {
                    console.log(data);
                    this.setState({
                        ...this.state,
                        body: data.data[0].body,
                        edit: true,
                        rid: data.data[0].reviewID,
                        score: data.data[0].score,
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
    }

    public render() {
        return (
            <div>
                <div className="form-group">
                    {this.test()}
                    <div>Score:</div>
                    <input name="score" type="number" className="form-control" id="score" aria-describedby="titlehelp" placeholder="Score" onChange={this.inputChange} value={this.state.score}/>
                </div>
                <div className="form-group">
                    <div>Review Body:</div>
                    <textarea name="body" className="form-control" rows={8} id="body" placeholder="Type your review here..." onChange={this.inputChange} value={this.state.body}/>
                </div>
                <button className="btn btn-default text-right" role="button" onClick={this.submit} type="button">Submit</button>
            </div>
        );
    }

    public test = ()=>{
         console.log(this.props.item.title);
         console.log(this.props.category.category);
    }

    private inputChange = (e:any) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    private submit = () => {
        if (this.state.edit) {
            this.submitEdit();
            return;
        }
        const review = {
            body: this.state.body,
            // category:this.props.category.category,
            // score: this.state.score,
            // title: this.props.item.title,
            // username: /* get logged-in user from local storage */ 'Dynamo'
            category: this.props.category.category,
            rid: this.state.rid,
            score: this.state.score,
            title: this.props.item.title,
            username: this.props.cognitoUser.user.getUsername(),
        }

        netService.postData('/review', review)
            .then((data) => {
                this.props.history.push(`/categories/${review.category}/${review.title}`);
            }).catch((err) => {
                console.log(err);
            });
    }

    private submitEdit = () => {
        netService.patchData('/review', {
            body: this.state.body,
            category: this.props.category.category,
            reviewID: this.state.rid,
            score: this.state.score,
            title: this.props.item.title,
        }).then((data) => {
            this.props.history.push(`/categories/${this.props.category.category}/${this.props.item.title}`);
        }).catch((err) => {
            console.log(err);
        });
    }

}
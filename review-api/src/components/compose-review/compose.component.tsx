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
            if (this.props.category.category && this.props.item.title) {
                cat = this.props.category.category;
                titl = this.props.item.title;
            } else {
                const splitPath = this.props.location.pathname.split('/');
                cat = splitPath[splitPath.length-3];
                titl = splitPath[splitPath.length-2];
            }
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
        let cat:string;
        let titl:string;
        if (this.props.category.category && this.props.item.title) {
            cat = this.props.category.category;
            titl = this.props.item.title;
        } else {
            const splitPath = this.props.location.pathname.split('/');
            cat = splitPath[splitPath.length-3];
            titl = splitPath[splitPath.length-2];
        }
        const review = {
            body: this.state.body,
            // category:this.props.category.category,
            // score: this.state.score,
            // title: this.props.item.title,
            // username: /* get logged-in user from local storage */ 'Dynamo'
            category: cat,
            rid: this.state.rid,
            score: this.state.score,
            title: titl,
            username: this.props.cognitoUser.user.getUsername(),
        }

        netService.postData('/review', review)
            .then((data) => {
                const rID = data.data;
                let category:string;
                let title:string;
                if (this.props.category.category && this.props.item.title) {
                    category = this.props.category.category;
                    title = this.props.item.title;
                } else {
                    const splitPath = this.props.location.pathname.split('/');
                    category = splitPath[splitPath.length-3];
                    title = splitPath[splitPath.length-2];
                    alert(`${title} ${category}`)
                }
                netService.postData(`/categories/${category}/${title}/review`, rID)
                    .then((resp) => {
                        this.props.history.push(`/categories/${category}/${title}`);
                    }).catch((err) => {
                        console.log(err);
                    });
            }).catch((err) => {
                console.log(err);
            });
    }

    private submitEdit = () => {
        let cat:string;
        let titl:string;
        if (this.props.category.category && this.props.item.title) {
            cat = this.props.category.category;
            titl = this.props.item.title;
        } else {
            const splitPath = this.props.location.pathname.split('/');
            cat = splitPath[splitPath.length-3];
            titl = splitPath[splitPath.length-2];
        }
        netService.patchData('/review', {
            body: this.state.body,
            category: cat,
            reviewID: this.state.rid,
            score: this.state.score,
            title: titl,
        }).then((data) => {
            this.props.history.push(`/categories/${cat}/${titl}`);
        }).catch((err) => {
            console.log(err);
        });
    }

}
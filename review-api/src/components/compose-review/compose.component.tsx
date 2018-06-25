import * as React from 'react';
import * as netService from '../../net-service/netService';

export class ComposeComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            body: '',
            score: '',
        }
    }
    
    public componentDidMount() {
        if (!this.props.cognitoUser.user) {
            this.props.history.push('');
            
        }
    }

    public render() {
        return (
            <div>
                <div className="form-group">
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

    private inputChange = (e:any) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    private submit = () => {
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
            category: cat,
            score: this.state.score,
            title: titl,
            username: this.props.cognitoUser.user.getUsername(),
        }

        netService.postData('/review', review)
            .then((data) => {
                this.props.history.push(`/categories/${cat}/${titl}`);
            }).catch((err) => {
                console.log(err);
            });
    }

}
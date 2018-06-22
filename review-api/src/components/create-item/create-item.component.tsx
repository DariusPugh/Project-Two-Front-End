import * as React from 'react';
import * as netService from '../../net-service/netService'

export class CreateItemComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            description: '',
            title: '',
        }
    }

    public componentDidMount() {
        if (!this.props.cognitoUser.user) {
            this.props.history.push('');
        } else {
            netService.getData(`/user/${this.props.cognitoUser.user.getUsername()}`)
                .then((data) => {
                    if (data.data.role !== 'admin') {
                        this.props.history.push('');
                    }
                }).catch((err) => {
                    console.log(err);           
                });
        }
    }

    public render() {
        return (
            <div>
                <div className="form-group">
                    <div>Name:</div>
                    <input name="title" type="text" className="form-control" id="title" aria-describedby="titlehelp" placeholder="Item name" onChange={this.inputChange} value={this.state.title}/>
                </div>
                <div className="form-group">
                    <div>Description:</div>
                    <textarea name="descritpion" className="form-control" rows={4} id="description" placeholder="Description" onChange={this.inputChange} value={this.state.description}/>
                </div>
                <button className="btn btn-default text-right" role="button" onClick={this.submit} type="button">Submit</button>
            </div>
        );
    }

    private inputChange = (e:any) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    private submit = () => {
        let cat;
        if (this.props.category.category) {
            cat = this.props.category.category;
        } else {
            const splitPath = this.props.location.pathname.split('/');
            cat = splitPath[splitPath.length-1];
        }
        if (this.state.title && this.state.description) {
            netService.postData(`/categories/${cat}`, {
                averageScore: 0,
                category: cat,
                count: 0,
                description: this.state.description,
                reviews: [],
                title: this.state.title,
            }).then((data) => {
                this.setState({
                    ...this.state,
                    description: '',
                    title: ''
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}

import * as React from 'react';
import * as netService from '../../net-service/netService';
// import { environment } from '../../environment';

export class CreateCategoryComponent extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            category: ''
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
                    <div>Category Name:</div>
                    <input name="category" type="text" className="form-control" id="category" aria-describedby="titlehelp" placeholder="Category name" onChange={this.inputChange} value={this.state.category}/>
                    <div>Image:</div>
                    <input name="image" type="text" className="form-control" id="image" aria-describedby="titlehelp" placeholder="Image url" onChange={this.inputChange} value={this.state.image}/>
                </div> 
                <button className="btn btn-default text-right" role="button" onClick={this.submit} type="button">Submit</button>
            </div>
        );
    }

    private submit = () => {
        let cat;
        if (this.state.image) {
            cat = {
                category: this.state.category,
                count: 0,
                image: this.state.image,
            }
        } else {
            cat = {
                category: this.state.category,
                count: 0,
            }
        }
        if (this.state.category) { 
            netService.postData('/categories', cat).then((data) => {
                this.setState({
                    category: '',
                    image: ''
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
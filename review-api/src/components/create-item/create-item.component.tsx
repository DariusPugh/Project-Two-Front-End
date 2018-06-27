import * as React from 'react';
import { Container, Row, Col} from 'reactstrap';
import * as netService from '../../net-service/netService'

export class CreateItemComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            description: '',
            image: '',
            title: '',
        }
    }

    public componentDidMount() {
        if (!this.props.cognitoUser.user) {
            this.props.history.push('');
        } else {
            let cat;
            const splitPath = this.props.location.pathname.split('/');
            cat = splitPath[splitPath.length-2];
            this.props.updateCategory(cat);
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
            <Container>
                <Row className="justify-content-center">
                    <Col md={{ size: 8, offset: 2 }}>
                        <form>
                            <form onSubmit={this.submit}>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="input-title">Item Name</label>
                                <input name="title" type="text" className="form-control" id="title" aria-describedby="titlehelp" placeholder="Name" onChange={this.inputChange} value={this.state.title}/>
                            </div>
                            <div>Image:</div>
                            <input name="image" type="text" className="form-control" id="image" aria-describedby="titlehelp" placeholder="Image url" onChange={this.inputChange} value={this.state.image}/>
                            </div>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="input-amount">Description</label>
                                <textarea name="description" className="form-control" rows={3} id="description" placeholder="Item description" onChange={this.inputChange} value={this.state.description}/>
                            </div>
                            </div>
                            <button type="button" onClick={this.submit} className="btn btn-dark">Submit</button>
                            </form>
                        </form>
                     </Col>
                </Row>
            </Container>
        );
    }

    private inputChange = (e:any) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    private submit = () => {
        let itm;
            
        if (this.state.image) {
            itm = {
                averageScore: 0,
                category: this.props.category.category,
                count: 0,
                description: this.state.description,
                image: this.state.image,
                reviews: [],
                title: this.state.title,
            }
        } else {
            itm = {
                averageScore: 0,
                category: this.props.category.category,
                count: 0,
                description: this.state.description,
                reviews: [],
                title: this.state.title,
            }
        }
        if (this.state.title && this.state.description) {
            netService.postData(`/categories/${this.props.category.category}`, itm)
            .then((data) => {
                this.setState({
                    ...this.state,
                    description: '',
                    image: '',
                    title: ''
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}

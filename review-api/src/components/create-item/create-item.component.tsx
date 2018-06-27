import * as React from 'react';
import { Container, Row, Col} from 'reactstrap';
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

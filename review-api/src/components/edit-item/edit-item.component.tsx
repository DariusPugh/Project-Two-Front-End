import * as React from 'react';
import { Container, Row, Col} from 'reactstrap';
import * as netService from '../../net-service/netService'

export class EditItemComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            item: ''
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
            
            this.props.updateCategory(cat);
            this.props.updateTitle(titl);

            netService.getData(`/categories/${cat}/${titl}`)
                .then((data) => {
                    this.setState({
                        ...this.state,
                        item: data.data[0]
                    });
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
                        <form onSubmit={this.submit}>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                                {this.getName()}
                            </div>
                            <div>Image:</div>
                            <input name="image" type="text" className="form-control" id="image" aria-describedby="titlehelp" placeholder="Image url" onChange={this.imageChange} value={this.state.item.image}/>
                            </div>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="input-amount">Description</label>
                                <textarea name="description" className="form-control" rows={3} id="description" placeholder="Item description" onChange={this.descriptionChange} value={this.state.item.description}/>
                            </div>
                            </div>
                            <button type="button" onClick={this.submit} className="btn btn-dark">Submit</button>
                        </form>
                     </Col>
                </Row>
            </Container>
        );
    }


    private imageChange = (e:any) => {
        const itm = this.state.item;
        itm.image = e.target.value;
        this.setState({
            ...this.state,
            item: itm
        });
    }

    private descriptionChange = (e:any) => {
        const itm = this.state.item;
        itm.description = e.target.value;
        this.setState({
            ...this.state,
            item: itm
        });
    }

    private getName = () => {
        if (this.state.item && this.state.item.title) {
            return(
                <div>{this.state.item.title}</div>
            );
        }
        return;
    }

    private submit = () => { 
        let edit;
        if (this.state.item.image) {
            edit = {
                description: this.state.item.description,
                image: this.state.item.image
            }
        } else {
            edit = {
                description: this.state.item.description,
            }
        }
        if (this.state.item.description) {
            netService.postData(`/categories/${this.state.item.category}/${this.state.item.title}`, edit).then((data) => {
                this.props.history.push(`/categories/${this.state.item.category}/${this.state.item.title}`)
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
import * as React from 'react';
import { Container, Row, Col} from 'reactstrap';


export class CreateItemComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log(props);
      }
    
   
    
    public render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={{ size: 8, offset: 2 }}>
                        <form>
                            <form /*Submit Here*/>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="input-title">Create a Category</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="input-title" 
                                    placeholder="Title"/>
                            </div>
                            </div>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="input-amount">Create Item</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="input-amount" 
                                    placeholder="Amount"/>
                            </div>
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                            </form>
                        </form>
                     </Col>
                </Row>
            </Container>
        );
    }
}

import * as React from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
export class ModalComponent extends React.Component <any,any>{
  constructor(props:any) {
    super(props);
    this.state = {
        backdrop: true,
        banned: '',
        history: this.props.history,
        modal: false,
        reviews:[],
        role: '',
        username: this.props.usernameModal,
        
    };

    this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }

  public toggle() {
    this.setState({
        username:this.props.usernameModal
    });
    axios.get('https://owdw8b3ri4.execute-api.us-east-2.amazonaws.com/dev/user/'+this.state.username)
    .then((resp:any)=>{
        this.setState({
            banned: resp.data.banned,
            modal: !this.state.modal,
            role: resp.data.role,
        });
    })
    .catch((err)=>{
        console.log(err);
    });

    axios.get('https://owdw8b3ri4.execute-api.us-east-2.amazonaws.com/dev/review/username/'+this.state.username)
    .then((resp:any)=>{
        this.setState({
            reviews: resp.data,
        })
    })
    .catch((err)=>{
        console.log(err);
    })


    console.log("test".repeat(4));
    console.log(this.state);
    console.log(this.props.usernameModal);
    


  }

  public changeBackdrop(e:any) {
    let value = e.target.value;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }

  public navigateToReview= (e: any, category:string, item:string,reviewID:any)=>{
      console.log({category,item});
      this.setState({
        modal: !this.state.modal,
    });
    console.log(this.props.history)
    this.props.updateCategory(category);
    this.props.updateTitle(item);
    this.props.history.push(`/categories/${category}/${item}`);
  }

  public render() {
    return (
      <div id="modal-wrapper">
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
          <ModalHeader toggle={this.toggle}>Profile</ModalHeader>
          <ModalBody>
            <div>
                {'username: '+this.state.username}
            </div>
            <div>
                {'role: '+this.state.role}
            </div>
            <div>
                {'banned: '+this.state.banned}
            </div>
            <p/>
            <div>
                {this.state.reviews.map((item:any, i:number)=>{
                    return(
                    <div key={i}>
                        <div  onClick={(e:any)=>{e.stopPropagation(); this.navigateToReview(e,item.category,item.title,item.reviewID)}}>
                            <div className="modal-user-reviews-list">
                                <span><strong>{item.category}: </strong></span> 
                                <span>{item.title}</span> 
                                <span><strong> Score: </strong></span> 
                                <span>{item.score}</span>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={(e:any)=>{e.stopPropagation(); this.toggle()}}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

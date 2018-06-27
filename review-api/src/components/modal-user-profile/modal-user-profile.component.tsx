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
  }

  public changeBackdrop(e:any) {
    let value = e.target.value;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }

  public navigateToReview= (e: any, category:string, item:string)=>{
      console.log({category,item});
      this.props.history.push(`/categories/${category}/${item}/review`);
  }

  public render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
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
            <div>
                {this.state.reviews.map((item:any, i:number)=>{
                    return(
                    <div key={i} onClick={(e:any)=>{console.log(item)}}>{item.body}</div>
                    )
                })}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

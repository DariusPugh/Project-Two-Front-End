import * as React from 'react';


export class RegisterComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log(props);
      }
    
    public updateAmount = (e: any) => {
        const amount = e.target.value;
        this.props.updateAmount(amount);
      }
    
    public updateDescription = (e: any) => {
        const description = e.target.value
        this.props.updateDescription(description);
      }
    
    public updateTitle = (e: any) => {
        const title = e.target.value
        this.props.updateTitle(title);
      }
    
    
      
    
    
    
    public render() {
        return (
            <form>
                <form /*Submit Here*/>
                <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="input-title">Username</label>
                    <input 
                        value = {this.props.title}
                        onChange = {this.updateTitle}
                        type="text" 
                        className="form-control" 
                        id="input-username" 
                        placeholder="Username"/>
                </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="input-amount">Password</label>
                    <input 
                        value = {this.props.amount}
                        onChange = {this.updateAmount}
                        type="number" 
                        className="form-control" 
                        id="input-password" 
                        placeholder="Password"/>
                </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="input-description">Email</label>
                    <input 
                        value = {this.props.description}
                        onChange = {this.updateDescription}
                        type="text" 
                        className="form-control" 
                        id="input-email" 
                        placeholder="description"/>
                </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </form>
        );
    }
}

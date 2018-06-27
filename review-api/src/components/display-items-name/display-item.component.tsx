import * as React from 'react';
import { ListGroup , ListGroupItem} from 'reactstrap';
// , Badge
export class DisplayItemComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }
  public navigateToItem = (e: any, item:any)=>{
    // this.props.updateSelectedItem(item);
    this.props.updateTitle(item.title);
    this.props.updateCategory(item.category);
    this.props.history.push(`/categories/${item.category}/${item.title}`);

  }

  public dipsplayDescription = (description: string)=>{
    if(description.length > 24){
      return (
        <em> {description.substring(0,24)}...</em>
      )
    }
    else{
      return(
        <em> {description}</em>
      )
    }
  }

  public render() {
    return (
      <div>
        <ListGroup>
          {this.props.sidebar.items.map((item:any,i:number) =>{
            return(
              <ListGroupItem key={"list"+i} className="list-group-item d-flex justify-content-between align-items-center list-group-item list-group-item-dark">
                <div className="container-fluid" key={"container" + i}>
                  <div className="row no-pad">
                    <div className="col-2">
                      <span><img src={this.getImage(i)} alt=""/></span>
                    </div>
                    <div className="col-sm-10">
                      <div id="display-list-title" className = "row" onClick={(e)=> this.navigateToItem(e,item)}>
                        <strong>{item.title}</strong>
                      </div>
                      <div className = "row">
                        Category: {item.category}
                      </div>
                      <div className = "row" >
                        Description: {this.dipsplayDescription(item.description)}
                      </div>
                      <div className = "row">
                        Average Score: {item.averageScore}
                      </div>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    );
  }

  private getImage = (i:number) => {
    if (this.props.sidebar.items[i].image) {
        return this.props.sidebar.items[i].image;
    }
    return "https://screenshotlayer.com/images/assets/placeholder.png";
  }

}
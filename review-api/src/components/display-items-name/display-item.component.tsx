import * as React from 'react';
import { ListGroup , ListGroupItem} from 'reactstrap';
// , Badge
export class DisplayItemComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }
  public navigateToItem = (e: any, item:any)=>{
    // this.props.updateSelectedItem(item);
    // this.props.updateTitle(item.title);
    // this.props.updateCategory(item.category);
    this.props.history.push(`/categories/${item.category}/${item.title}`);

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
                      <span><img src="https://images.pexels.com/photos/33537/cat-animal-cat-portrait-mackerel.jpg?auto=compress&cs=tinysrgb&h=350" alt=""/></span>
                    </div>
                    <div className="col-sm-10">
                      <div id="display-list-title" className = "row" onClick={(e)=> this.navigateToItem(e,item)}>
                        <strong>{item.title}</strong>
                      </div>
                      <div className = "row">
                        Category: {item.category}
                      </div>
                      <div className = "row" >
                        Description: <em>{item.description}</em>
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
}
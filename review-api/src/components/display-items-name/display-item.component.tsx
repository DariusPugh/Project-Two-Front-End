import * as React from 'react';


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
        {this.props.sidebar.items.map((item:any,i:number) =>{
          return(
            <div className="container-fluid" key="container1">
                <div className = "row" key="r1" onClick={(e)=> this.navigateToItem(e,item)}>
                  {item.title}
                </div>
                <div className = "row" key="r2">
                  Category: {item.category}
                </div>
                <div className = "row" key="r3">
                  Description: {item.description}
                </div>
                <div className = "row" key="r4">
                  Average Score: {item.averageScore}
                </div>
                <hr/>
            </div>
          )
        })}
      </div>
    );
  }
}
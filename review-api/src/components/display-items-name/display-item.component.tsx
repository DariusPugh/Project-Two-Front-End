import * as React from 'react';


export class DisplayItemComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        {this.props.sidebar.items.map((item:any) =>{
          return(
            <div className="container-fluid" key="container1">
                <div className = "row" key="r1">
                  {item.title}
                </div>
                <div className = "row" key="r2">
                  Category: {item.category}
                </div>
                <div className = "row" key="r3">
                  description: {item.description}
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
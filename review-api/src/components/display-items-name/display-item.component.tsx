import * as React from 'react';


export class DisplayItemComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        {this.props.sidebar.input}
      </div>
    );
  }
}
import * as React from 'react';
import { Alert } from 'reactstrap';



export class AlertComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Alert color="dark">
            You have successfully logged out!
        </Alert>
      </div>
    );
  }
}
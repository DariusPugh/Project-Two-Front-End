import * as React from 'react';


// Component for right arrow
export class CarouselRightArrow extends React.Component<any,any> {

  constructor(props: any) {
    super(props);
  }
  
    public render() {
      return (
        <a
          href="#"
          className="carousel__arrow carousel__arrow--right"
          onClick={this.props.onClick}
        >
          <span className="fa fa-2x fa-angle-right" />
        </a>
      );
    }
  }
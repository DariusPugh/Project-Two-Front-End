import * as React from 'react';


// Component for left arrow
export class CarouselLeftArrow extends React.Component<any,any> {

  constructor(props: any) {
    super(props);
  }
  
    public render() {
      return (
        <a
          href="#"
          className="carousel__arrow carousel__arrow--left"
          onClick={this.props.onClick}
        >
          <span className="fa fa-2x fa-angle-left" />
        </a>
      );
    }
  }
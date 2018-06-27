import * as React from 'react';


// Component for carousel indicator
export class CarouselIndicator extends React.Component<any,any> {

  constructor(props: any) {
    super(props);
  }

    public render() {
      return (
        <li>
          <a
            className={
              this.props.index === this.props.activeIndex
                ? "carousel__indicator carousel__indicator--active"
                : "carousel__indicator"
            }
            onClick={this.props.onClick}
          />
        </li>
      );
    }
  }
import * as React from 'react';


// Component for slide
export class CarouselSlide extends React.Component<any,any> {

  constructor(props: any) {
    super(props);
  }
  
    public render() {
      return (
        <li
          className={
            this.props.index === this.props.activeIndex
              ? "carousel__slide carousel__slide--active"
              : "carousel__slide"
          }
        >
          <p className="carousel-slide__content">{this.props.slide.content}</p>
  
          <p>
            <strong className="carousel-slide__author">
              {this.props.slide.author}
            </strong>,
            {" "}
            <small className="carousel-slide__source">
              {this.props.slide.source}
            </small>
          </p>
        </li>
      );
    }
  }
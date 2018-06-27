import * as React from 'react';
// import { render } from 'react-dom';
import { CarouselIndicator } from './carousel-indictor.component';
import { CarouselLeftArrow } from './carousel-left-arrow.component';
import { CarouselRightArrow } from './carousel-right-arrow.component';
import { CarouselSlide } from './carousel-slide.component';

export const carouselContainer = document.querySelector(".carousel-container");

// Data for carousel
export const carouselSlidesData = [
  {
    author: "Bane",
    content:
      "Tomorrow, you will be released. If you are bored of brawling with thieves and want to achieve something there is a rare blue flower that grows on the eastern slopes. Pick one of these flowers. If you can carry it to the top of the mountain, you may find what you were looking for in the first place.",
    source: "facebook"
  }, {
    author: "Ra's Al Ghul",
    content:
      "You have learn to bury your guilt with anger. I will teach you to confront it and to face the truth.",
    source: "Snapchat"
  }, {
    author: "Joker",
    content:
      "Introduce a little anarchy, upset the established order and everything becomes chaos. I'm an agent of chaos. Oh, and you know the thing about chaos? It's fair.",
    source: "facebook"
  }, {
    author: "Bruce Wayne",
    content:
      "I can't do that as Bruce Wayne... as a man. I'm flesh and blood. I can be ignored, destroyed. But as a symbol, I can be incorruptible, I can be everlasting.",
    source: "facebook"
  }, {
    author: "Rachel Dawes",
    content:
      "But it's not who you are underneath... it's what you do that defines you.",
    source: "twitter"
  }, {
    author: "John Blake",
    content:
      "When their enemies were at the gates the Romans would suspend democracy and appoint one man to protect the city. It wasn't considered an honor, it was a public service.",
    source: "Google+"
  }, {
    author: "Alfred Pennyworth",
    content:
      "Master Wayne, you've been gone a long time. You look very fashionable. Apart from the mud.",
    source: "twitter"
  }
];


// Carousel component
export class Carousel extends React.Component<any,any> {
  constructor(props: any) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0
    };
  }

  public goToSlide(index: any) {
    this.setState({
      activeIndex: index
    });
  }

  public goToPrevSlide(e: any) {
    e.preventDefault();

    let index = this.state.activeIndex;
    const { slides } = this.props;
    const slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index
    });
  }

  public goToNextSlide(e: any) {
    e.preventDefault();

    let index = this.state.activeIndex;
    const { slides } = this.props;
    const slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index
    });
  }

  public render() {
    return (
      <div className="carousel">
        <CarouselLeftArrow onClick={(e: any) => this.goToPrevSlide(e)} />

        <ul className="carousel__slides">
          {this.props.slides.map((slide: any, index: any) =>
            <CarouselSlide
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              slide={slide}
            />
          )}
        </ul>

        <CarouselRightArrow onClick={(e: any) => this.goToNextSlide(e)} />

        <ul className="carousel__indicators">
          {this.props.slides.map((slide: any, index: any) =>
            <CarouselIndicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              onClick={(e: any) => this.goToSlide(index)}
            />
          )}
        </ul>
      </div>
    );
  }
}

// Render Carousel component
// render(<Carousel slides={carouselSlidesData} />, carouselContainer);
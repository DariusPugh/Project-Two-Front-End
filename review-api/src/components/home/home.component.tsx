import * as React from 'react';
import { Carousel } from '../carousel/carousel.component';
// import { render } from 'react-dom';

// const carouselContainer = document.querySelector(".carousel-container");

// Data for carousel
export const carouselSlidesData = [
  {
    author: "From",
    content:
      "Welcome to IDC Reviews!! The place where you and literally review ANYTHING!! For returning members please click 'Sign In' on the left! For new users please consider registering! It will grant you access to posting on the website! To register, click 'Register' on the left. And verify your email!",
    source: "Dev Team"
  }, {
    author: "News",
    content:
      "There will be a $1,000,000 dollar on Feb 30, 2019! REGISTER FOR A CHANCE TO WIN!!",
    source: "Giveaway"
  }, {
    author: "News",
    content:
      "Our Newest added Category is Pets!",
    source: "Updates"
  }, {
    author: "Inspiration",
    content:
      "In the end, we only regret the chances we didn't take -Lewis Carroll",
    source: "Quote"
  }, {
    author: "News",
    content:
      "This is most certainly... the absolute greatest site... I have ever visited in my life. - Mark Zuckerburg",
    source: "Review"
  }
];

export class HomeComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
          <div className="home-page-header">
            <h1> WELCOME TO IDC REVIEWS! </h1>
          </div>
        <div className="row carousel-container-wrapper">
          <Carousel slides={carouselSlidesData} />
        </div>
        </div>
    );
  }
}

// render(<Carousel slides={carouselSlidesData} />, carouselContainer);
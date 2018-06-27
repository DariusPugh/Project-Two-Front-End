// import React, { Component } from 'react';

// import {
//   Carousel,
//   CarouselItem,
//   CarouselControl,
//   CarouselIndicators,
//   CarouselCaption
// } from 'reactstrap';

// const items = [
//   {
//     altText: 'Slide 1',
//     caption: 'Slide 1',
//     id: 1,
//   },
//   {
//     altText: 'Slide 2',
//     caption: 'Slide 2',
//     id: 2
//   },
//   {
//     altText: 'Slide 3',
//     caption: 'Slide 3',
//     id: 3,
//   }
// ];

// class Example extends Component {
//   constructor(props: any) {
//     super(props);
//     this.state = { activeIndex: 0 };
//     this.next = this.next.bind(this);
//     this.previous = this.previous.bind(this);
//     this.goToIndex = this.goToIndex.bind(this);
//     this.onExiting = this.onExiting.bind(this);
//     this.onExited = this.onExited.bind(this);
//   }

//   public onExiting() {
//    const animating = true;
//   }

//   public onExited() {
//     const animating = false;
//   }

//   public next() {
//     let animating;
//     if (this.animating) {
//         return;
//     }
//     const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
//     this.setState({ activeIndex: nextIndex });
//   }

//   public previous() {
//     if (this.animating) {
//         return;
//     }
//     const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
//     this.setState({ activeIndex: nextIndex });
//   }

//   public goToIndex(newIndex) {
//     if (this.animating) {
//         return;
//     }
//     this.setState({ activeIndex: newIndex });
//   }

//   public render() {
//     const { activeIndex } = this.state;

//     const slides = items.map((item) => {
//       return (
//         <CarouselItem
//           className="custom-tag"
//           tag="div"
//           key={item.id}
//           onExiting={this.onExiting}
//           onExited={this.onExited}
//         >
//           <CarouselCaption className="text-danger" captionText={item.caption} captionHeader={item.caption} />
//         </CarouselItem>
//       );
//     });

//     return (
//       <div>
//         <style>
//           {
//             `.custom-tag {
//                 max-width: 100%;
//                 height: 500px;
//                 background: black;
//               }`
//           }
//         </style>
//         <Carousel
//           activeIndex={activeIndex}
//           next={this.next}
//           previous={this.previous}
//         >
//           <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
//           {slides}
//           <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
//           <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
//         </Carousel>
//       </div>
//     );
//   }
// }

// export default Example;
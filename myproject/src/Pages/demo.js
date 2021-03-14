// import React from 'react'
// import men from '../assets/images/men.jpg';


// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//     slidesToSlide: 3 // optional, default to 1.
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//     slidesToSlide: 2 // optional, default to 1.
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     slidesToSlide: 1 // optional, default to 1.
//   }
// };
// ;



// export default function demo(props) {
//     return (
//         <Carousel
//         swipeable={false}
//         draggable={false}
//         showDots={true}
//         responsive={responsive}
//         ssr={true} // means to render carousel on server-side.
//         infinite={true}
//         autoPlay={props.deviceType !== "mobile" ? true : false}
//         autoPlaySpeed={1000}
//         keyBoardControl={true}
//         customTransition="all .5"
//         transitionDuration={500}
//         containerClass="carousel-container"
//         removeArrowOnDeviceType={["tablet", "mobile"]}
//         deviceType={props.deviceType}
//         dotListClass="custom-dot-list-style"
//         itemClass="carousel-item-padding-40-px"
//       >
//         <div>Item 1</div>
//         <div>Item 2</div>
//         <div>Item 3</div>
//         <div>Item 4</div>
//       </Carousel>
//     )
// }










import React, { Component } from 'react';
// import './news.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

class demo extends Component {

    state = {
        loading: false,
        data: [],
        headline: []
    }

    componentDidMount() {
        this.setState({ loading: true })
        console.log('app mounted');
        fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8ee8c21b20d24b37856fc3ab1e22a1e5')
            .then(data => data.json())
            .then(data => this.setState({ data: data.articles, loading: false }, () => console.log(data.articles)))
    }

    render() {
        return (
            <div className="about container">
                <h1 className="text-left"><b>Latest News</b></h1>
                {this.state.loading
                    ? "loading..."
                    : <div>
                       <Carousel responsive={responsive}>
                        {this.state.data.map((post, indx) => {
                            return (

                                <div className="card m-5" key={indx}>
                                    <img className="media-img card-img-top" src={post.urlToImage} alt="Alt text"></img>
                                {/* <img style={{ height: '100px' }} src={post.urlToImage} alt="Alt text"></img> */}

                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.description}</p>
                                        <a href={post.url} target="_blank" rel="noopener noreferrer">Read More</a>
                                    </div>
                                </div>

                            )
                        })}
                         </Carousel>
                    </div>
                }
            </div>
        )
    }
}
export default demo;
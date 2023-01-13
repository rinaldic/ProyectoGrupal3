import React from 'react';
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { height } from '@mui/system';




export default function CarouselImg () {

  let detail = useSelector((state) => state.detail);
      
    return (
    
      <Carousel style={{ width: "29rem" }}>
        {detail.images && detail.images.map((img) => {
          return (<Carousel.Item>
            <img
              className="d-block w-100"
              src={img}
              alt="First slide"
            />
          </Carousel.Item>
          )
        })}
      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.images[0]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.images[1]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.images[2]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.images[3]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.images[4]}
          alt="First slide"
        />
      </Carousel.Item> */}
      
    </Carousel>
       
 
    );
};


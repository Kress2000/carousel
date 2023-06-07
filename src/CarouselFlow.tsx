
import { useEffect, useRef } from "react";

const RADIUS = 1200;
const FLIP_RANGE = 3;

const CarouselFlow = (props:{imageData:string[]}) => {
  
  const el = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  let angleUnit:number, currentIndex:number, currentAngle:number;

  // Help function to set element style transform property
  function setTransform(el:HTMLDivElement, xpos:number, zpos:number, angle:number, flipAngle:number) {
    el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${angle}deg) rotateX(${flipAngle}deg)`;
  }

  useEffect(() => {

    angleUnit = 360 / props.imageData.length;
    currentIndex = currentAngle = 0;
    target(0, true);
  }, [props.imageData]);

  // Target an item and make it center
  function target(index:number, initial:boolean = false) {

    // Display full size image if matched index
    if (!initial && index == currentIndex) pickImage(props.imageData[index]);

    // Calculate amount of angle to shift
    let deltaAngle = -(index - currentIndex) * angleUnit;
    if (deltaAngle < -180) deltaAngle += 360;
    else if (deltaAngle > 180) deltaAngle -= 360;

    currentAngle += deltaAngle;
    currentIndex = index;

    // Rotate the container and flip item angle
    const cf = el.current!;
    cf.style.transform = `translateZ(-1250px) rotateY(${currentAngle}deg)`;

    // Flip items angle
    let fliptAngle = 90;
    const items = cf.children;

    // Iterate the items and apply transformation
    for (let i = 0; i < items.length;  i++) {

      const item = items[i] as HTMLDivElement;
      const itemAngle = angleUnit * i;
      const itemAngleRad = itemAngle * Math.PI / 180;
      const xpos = Math.sin(itemAngleRad) * RADIUS;
      const zpos = Math.cos(itemAngleRad) * RADIUS;

      let deltaIndex = Math.abs(i - index);
      if (deltaIndex > cf.children.length / 2) {
        deltaIndex = cf.children.length - deltaIndex;
      }
      if (deltaIndex <= FLIP_RANGE) {
        fliptAngle = deltaIndex * (90 / FLIP_RANGE); 
      }
      else fliptAngle = 90;
      setTransform(item, xpos, zpos, itemAngle, fliptAngle);
    }
  }
  
  // Display full size image
  const pickImage = (imgUrl:string) => {
    img.current!.style.backgroundImage = `url(${imgUrl})`;
    img.current!.style.transform = 'scale(1, 1)';
  }

  return (
    <div className="container my-4">
      <div className="carouselflow" ref={el}>
        {props.imageData.map((it, index) => 
          <div 
              onClick={() => target(index)}
              key={index} 
              style={{backgroundImage:`url(${it})`}}
              className='carouselflow-item'>
          </div>)
        }
      </div>
      <div
        onClick={() => {img.current!.style.transform = 'scale(0, 0)'}}
        className='image-display'
        ref={img}>
      </div>
    </div>
  )
}

export default CarouselFlow;

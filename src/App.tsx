import CarouselFlow from "./CarouselFlow";
import imagesData from "./data";
import './App.css';

function App() {
  return (
    <div className="w-screen h-screen p-2 flex flex-col items-center overflow-hidden bgContainer">
      <h1 className="text-center font-bold text-2xl m-2">
        React Carousel Slider
      </h1>
      <CarouselFlow imageData={imagesData}></CarouselFlow>
      <img src="./images/gif.gif" className="bg"></img>
    </div>
  );
}

export default App;

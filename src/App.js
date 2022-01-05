import React, { useState } from "react";
import SideBarItems from "./components/SideBarItems";
import "./App.css";
import Slider from "./components/Slider";
import * as htmlImage from 'html-to-image';
import * as download from 'downloadjs';

const DEFAUL_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 50,
    },
    unit: "px",
  },
];

const App = () => {
  const [image, setImage] = useState(null);

  const [options, setOptions] = useState(DEFAUL_OPTIONS);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedOption = options[selectedIndex];

  const handleChange = (event) => {
    const objectURL = URL.createObjectURL(event.target.files[0]);
    setImage(objectURL);
  };

  const applyFilters = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return {
      filter: filters.join(" "),
      backgroundImage: `url(${image})`,
    };
  };

  const downloadImage = ()=>{
    htmlImage.toPng(document.getElementById('image')).then((dataUrl)=>{
      download(dataUrl,`PhotoShop_${Date.now()}.png`)
    })
  }

  const sliderChange = ({ target }) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedIndex) return option;
        return { ...option, value: target.value };
      });
    });
  };

  return (
    <div className="container">
      {image ? (
        <div className="main-image" id="image" style={applyFilters()} />
      ) : (
        <div className="upload-image">
          <h1>PhotoShop Clone</h1>
          <input type="file" accept="image/*" onChange={handleChange} />
        </div>
      )}
      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <SideBarItems
              key={index}
              name={option.name}
              active={index === selectedIndex}
              handleClick={() => { setSelectedIndex(index) }}
            />
          );
        })}
        <button 
        onClick={downloadImage}
         className="download" >Download</button>
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={sliderChange}
      />
    </div>
  );
};

export default App;

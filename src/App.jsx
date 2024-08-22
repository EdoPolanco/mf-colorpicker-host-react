import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import ColorPicker from "colorPicker/ColorPicker";
import ColorList from "colorList/ColorList";
import Preset  from "preSet/Preset"
import { useColors } from "colorPicker/useColors";
import { usePreset } from "preSet/usePreset";
import { useColorlist } from "colorList/useColorlist";

import "./index.css";

const App = () => {
const {color, colorList, handleChangeColor, handleSubmitButtonColor} = useColors();
const {presetList, handleTitleChange, handleConjuntoChange, handleDrop, handleRemoveConjunto} = usePreset();
const {draggedColor, handleDragStart} = useColorlist();

useEffect(() => {
  // Inicializar tooltips de Bootstrap
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new window.bootstrap.Tooltip(tooltipTriggerEl);
  });
}, []);

  return (
  <>
    <h1 className="text-center bg-dark text-white p-4"> Color Picker</h1>
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="card" style={{maxHeight: '250px', overflowY: 'auto'}}>
            <ColorList 
              colorList = {colorList} 
              handleDragStart = {handleDragStart}
              handleSubmitButtonColor = {handleSubmitButtonColor}
            />
          </div>
        </div>
        <div className="col-12 col-md-8">
          <ColorPicker 
            color = {color} 
            handleChangeColor = {handleChangeColor} 
            handleSubmitButtonColor = {handleSubmitButtonColor}
            />
        </div>
      </div>
      <div className="row mt-5">
        <Preset
          presetList = {presetList}
          handleTitleChange = {handleTitleChange}
          handleConjuntoChange = {handleConjuntoChange}
          draggedColor={draggedColor}
          handleDrop={handleDrop}
          handleRemoveConjunto={handleRemoveConjunto}
        />
      </div>
    </div>
  </>
  )
};
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
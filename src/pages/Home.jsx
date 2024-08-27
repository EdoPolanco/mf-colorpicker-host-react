import React from 'react'
import {Error} from "../components/Error"
import ColorPicker from "colorPicker/ColorPicker";
import ColorList from "colorList/ColorList";
import Preset  from "preSet/Preset"

const Home = ({
    colorList
    ,handleDragStart
    ,handleDeleteColor
    ,color
    ,handleChangeColor
    ,handleSubmitSaveColor
    ,presetList
    ,handleTitleChange
    ,handleConjuntoChange
    ,draggedColor
    ,handleDrop
    ,handleRemoveConjunto
}) => {
  return (
    <Error>
    <div className="container mt-4">
    <div className="row">
      <div className="col-12 col-md-4">
        <div className="card" style={{maxHeight: '250px', overflowY: 'auto'}}>
          <ColorList 
            colorList = {colorList} 
            handleDragStart = {handleDragStart}
            handleDeleteColor = {handleDeleteColor}
          />
        </div>
      </div>
      <div className="col-12 col-md-8">
        <ColorPicker 
          color = {color} 
          handleChangeColor = {handleChangeColor} 
          handleSubmitSaveColor = {handleSubmitSaveColor}
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

    </Error>
  )
}

export default Home
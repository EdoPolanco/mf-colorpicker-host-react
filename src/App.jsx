import React, { useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar  from "mf_navbar/Navbar"
import { useColors } from "colorPicker/useColors";
import { usePreset } from "preSet/usePreset";
import { useColorlist } from "colorList/useColorlist";

import Loader from "./components/Loader"

import "./index.css";

const Features = lazy(()=> import( "./pages/Features"));
const Vue = lazy(()=> import( "./pages/Vue"));
const Home = lazy(()=> import( "./pages/Home"));
const NotFound = lazy(()=> import( "./pages/NotFound"));

const App = () => {
const {color, colorList, handleChangeColor, handleSubmitSaveColor, handleDeleteColor} = useColors();
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
  <BrowserRouter>
  <Navbar />
    <h1 className="text-center bg-secondary-subtle text-dark p-4"> Color Picker</h1>
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<Loader />}>
          <Home 
            colorList = {colorList} 
            handleDragStart = {handleDragStart}
            handleDeleteColor = {handleDeleteColor}
            color = {color} 
            handleChangeColor = {handleChangeColor} 
            handleSubmitSaveColor = {handleSubmitSaveColor} 
            presetList = {presetList}
            handleTitleChange = {handleTitleChange}
            handleConjuntoChange = {handleConjuntoChange}
            draggedColor={draggedColor}
            handleDrop={handleDrop}
            handleRemoveConjunto={handleRemoveConjunto}
          />
        </Suspense>
        } >
          
        </Route>
      <Route path="/features" element={
        <Suspense fallback={<Loader />}>
          <Features colorList = {colorList} />
        </Suspense>
        
        } ></Route>
      <Route path="/Vue" element={
        <Suspense fallback={<Loader />}>
          <Vue />
        </Suspense>
        } ></Route>
      {/* <Route path="/Vue/:name" element={ // el :name se usa para enviar parametros como un id o nombre para en este caso sacar un detalle
        <Suspense fallback={<Loader />}>
          <DetailVue />                      // esto es solo a modo de ejemplo.
        </Suspense>
        } ></Route> */}
      <Route path="*" element={<NotFound />} ></Route>
    </Routes>
  </BrowserRouter>
  )
};
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
import React from 'react'
import {Error} from "../components/Error"
import Information from "mf_information/Information"

const Features = ({colorList }) => {
  return (
    <>
    <div className='text-center my-5'>we are working it...!</div>
    <Error >
        <Information colorList={colorList}/>
    </Error>
    
    </>
  )
}

export default Features
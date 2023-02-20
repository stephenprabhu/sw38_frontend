import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import SVLogo from '../assets/sv388-min.png';


const HomeDrawerContent = ({onClose}) => {
  return (
    <div>
        <div onClick={onClose}> <AiOutlineClose size={30} /></div>
        <div style={{textAlign:"center"}}>
          <img src={SVLogo} width={150} />
        </div>
    </div>
  )
}

export default HomeDrawerContent
import React from 'react'
import Header from './Header'
const Button = (props) => {
  return (
    <div>
        <button className={`${props.isSelected  ? 'bg-white text-gray-700' : 'bg-gray-700'}   h-10 w-40 cursor-pointer text-center rounded-xl transition-all duration-200 ease-in-out` }onClick={props.onClick}>
          <div className="flex justify-between px-3">
             <img src={props.img} alt="" className='h-6 w-6 '/>
          
            {props.title}
          </div>
          
           
        </button>
    </div>
  )
}

export default Button
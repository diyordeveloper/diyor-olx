import React from 'react'
import GifLoader from '../../assets/img/loader_.gif'
import './loading.scss'
function Loading() {
  return (
    <div className='gifloader'>
        <img src={GifLoader} alt="Error!!!" />
    </div>
  )
}

export default Loading
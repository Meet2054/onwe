import React from 'react';
import dummyimage from '../../images/dummypost.png';

const Sports = () => {
  return (
    <div>
      <div className='d-flex flex-column px-5'>
        <div className='post-top py-1'>
          <div>
            <i className="bi bi-person-circle"></i>
            <p className='d-inline px-2'>Dharmaveer </p>
          </div>
        </div>
        <div className='post-image py-2'>
          <img src={dummyimage} className='img-pro image-fluid'/>
        </div>
        <div className='post-like py-2'>
          <div>
            <i className="bi bi-hand-thumbs-up"></i><p className='d-inline px-2'>360</p>
            <i class="bi bi-chat-left px-4"></i>
          </div>
        </div>
        <div className='post-des py-2'>
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
         a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but 
         also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with 
         the release of Letraset sheets containing Lorem
        </div>
      </div>
    </div>
  );
}

export default Sports;

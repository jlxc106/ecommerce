import React from 'react';

const renderListOfErrors = errors =>{
    return errors.map((error, index) =>{
        if(index===0){
            return null;
        }
        return <li key={index} className="text-red">{error}</li>
    })
}


export const renderField = input => {
  // console.log(input);
  const hasError = input.meta.touched && input.meta.error;
  return (
    <div>
      <label>{input.label}</label>
      <div>
        <input {...input.input} type={input.type} />
        {hasError ? 
        typeof(input.meta.error) === 'object' ?
        
         <ul className='text-red'>
            {input.meta.error[0]}
            {renderListOfErrors(input.meta.error)}
         </ul>
        
        : 
        <span className="text-red">{input.meta.error}</span>
        
        : null}
      </div>
    </div>
  );
};

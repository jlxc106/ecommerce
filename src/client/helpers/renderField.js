import React from 'react';

const renderListOfErrors = errors => {
  return errors.map((error, index) => {
    if (index === 0) {
      return null;
    }
    return (
      <li key={index} className="text-red error-li">
        {error}
      </li>
    );
  });
};

export const renderField = ({
  label,
  input,
  type,
  meta: { touched, error }
}) => {
  const hasError = touched && error;
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} />
        {hasError ? (
          typeof error === 'object' ? (
            <ul className="text-red error-li">
              {error[0]}
              {renderListOfErrors(error)}
            </ul>
          ) : (
            <span className="text-red">{error}</span>
          )
        ) : null}
      </div>
    </div>
  );
};

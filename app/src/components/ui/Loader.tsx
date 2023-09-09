import React from 'react';
import '../css/loader.css';

export default function Loader(): JSX.Element {
  return (
    <div className="loader">
      <div className="circle1" />
      <div className="circle2" />
      <div className="circle3" />
    </div>
  );
}

import React from 'react';
import Input from './Input';

const Main = () => {
  return (
    <div id="Main" className="flex-grow-1">
      <section className="container-fluid bg-dark p-5">
        <Input />
      </section>
      <section className="container-fluid container-xxl p-5"></section>
    </div>
  );
};

export default Main;


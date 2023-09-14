import React from 'react';
import Input from './Input';
import Posts from './Posts';
import Footer from '../Footer/Footer';

const Main = () => {
  return (
    <div id="Main" className="flex-grow-1">
      <section className="container-fluid bg-dark p-5 w-75">
        <Input />
      </section>
      <section className="container-fluid container-xxl p-5 w-75">
        <Posts />
      </section>
      <Footer />
    </div>
  );
};

export default Main;

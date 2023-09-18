import React from 'react';
import { useSelector } from 'react-redux';
import Input from './Input';
import Posts from './Posts';
import Feeds from './Feeds';
import Footer from '../Footer/Footer';
import ModalWindow from '../Modal/Modal';

const Main = () => {
  const { isOpened } = useSelector((state) => state.modal);
  console.log(isOpened, 'ISOPEND!!!!!!!!!!!!!@@@@@@@@@@@');

  return (
    <div id="Main" className="flex-grow-1">
      <section className="container-fluid bg-dark p-5">
        <Input />
      </section>
      <section className="container-fluid container-xxl p-5">
        <div className="row">
          <Posts />
          { isOpened === true && <ModalWindow />}
          <Feeds />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Main;

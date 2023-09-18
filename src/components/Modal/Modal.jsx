import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toogleModal } from '../../slices/modalSlice';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const currentPostId = useSelector((state) => state.modal.postId);
  const { t } = useTranslation();
  const currentPost = posts.find((post) => post.id === currentPostId);
  console.log('Current POST', currentPost);

  return (
    <Modal centered show>
      <Modal.Header>
        <Modal.Title>{currentPost.title}</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => dispatch(toogleModal())}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{currentPost.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <Button className="me-2">{t('modal.btnRead')}</Button>
          <Button>{t('modal.btnClose')}</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalWindow;

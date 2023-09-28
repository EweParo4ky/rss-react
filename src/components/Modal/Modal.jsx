import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalSlice';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const currentPostId = useSelector((state) => state.modal.postId);
  const { t } = useTranslation();
  const currentPost = posts.find((post) => post.id === currentPostId);

  return (
    <Modal centered show>
      <Modal.Header>
        <Modal.Title>{currentPost.title}</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => dispatch(closeModal())}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{currentPost.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <a type="button" className="btn btn-primary full-article me-2" href={currentPost.link} target="_blank" rel="noopener noreferrer">
            {t('modal.btnRead')}
          </a>
          <Button
            variant="secondary"
            onClick={() => dispatch(closeModal())}
          >
            {t('modal.btnClose')}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalWindow;

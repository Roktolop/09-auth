'use client';

import { createPortal } from 'react-dom';
import { useCallback, useEffect } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode,
  onClose?: () => void,
}

export function Modal({ children, onClose }: ModalProps) {

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }

  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    }

    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'visible'

    }
  }, [handleClose]);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {children}
      </div>
    </div>,
    modalRoot
  )
}
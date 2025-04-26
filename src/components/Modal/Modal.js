import React, { useEffect } from 'react'
import './Modal.css'
import { useDispatch } from 'react-redux'
import { setActiveModal } from 'store/app'

const Header = ({ title, onClose }) => {
  return (
    <div className="modal-header">
      <div className="close-button" onClick={onClose} />
      <div className="modal-header-text">{title}</div>
    </div>
  )
}

const Modal = ({ title, children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        dispatch(setActiveModal(undefined))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [dispatch])

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-close-button" />
        <Header title={title} onClose={() => dispatch(setActiveModal(undefined))} />
        {children}
      </div>
    </div>
  )
}

export default Modal

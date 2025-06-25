import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  children?: React.ReactNode;
  confirmText?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, children, confirmText }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Annuler</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">{confirmText || 'Confirmer'}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;


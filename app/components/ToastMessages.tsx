import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastMessagesProps{
  errorMessage?: string | null,
  successMessage?: string | null,
  resetMessages?: any
}

const ToastMessages = ({ errorMessage = '', successMessage = '', resetMessages }: ToastMessagesProps) => {
    
  useEffect(() => {
    
    if (errorMessage && errorMessage != '') {
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      resetMessages && resetMessages();
    }
    
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage && successMessage != '') {
      toast.success(successMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      resetMessages && resetMessages();
    }
    
  }, [successMessage]);

  return <ToastContainer />;
};

export default ToastMessages;


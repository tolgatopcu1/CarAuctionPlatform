import { toast, TypeOptions } from 'react-toastify';

const ToastrNotify = (message: string, type: TypeOptions = "success") => { // Default type olarak success
  toast(message, { // toast fonksiyonunu kullanın
    type: type,
    position: "bottom-right",
    autoClose: 4500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
  });
};

export default ToastrNotify;

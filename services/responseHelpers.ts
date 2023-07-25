import { toast } from "react-toastify";
const handleResponse = (response: Response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

function handleDataStatus(data:any) { 
    if (data.status) {
      if (data.status === 'success') {
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        if(data.id){
          return { id: data.id };
        }
      }
      if (data.status === 'error') {
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
      if (data.errors && typeof data.errors === 'object') {
        Object.values(data.errors).forEach((errorMessages: any) => {
          if (Array.isArray(errorMessages)) {
            errorMessages.forEach((message: string) => {
              toast.error(message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              });
            });
          }
        });
      }          
    }
    return data;
  }

  function handleError(error:any) {
    toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
    });
  }

export { handleResponse, handleDataStatus, handleError }
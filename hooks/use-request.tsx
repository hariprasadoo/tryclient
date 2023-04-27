import axios from 'axios';
import {  useState } from 'react';


interface UseRequestProps {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: object;
  onSuccess?:any
}

const useRequest = ({ url, method, body, onSuccess }: UseRequestProps) => {
  const [errors, setErrors] = useState<JSX.Element | null>(null);
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data
    } catch (err:any) {
      setErrors(
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Oops! An error occurred.</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err: any) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
          <hr />
          <p className="mb-0">Please try again later.</p>
        </div>
      );
     
    }
  };

  return { doRequest, errors };
};
export default useRequest;

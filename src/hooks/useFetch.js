import Swal from 'sweetalert2';
import { StatusCode } from 'status-code-enum';

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
};

export default function useFetch(url, options = {}) {
  return fetch(url, { ...DEFAULT_OPTIONS, ...options })
    .then((res) => {
      if (res.status >= StatusCode.ServerErrorInternal) {
        Swal.fire('Server Internal Error');
        return;
      }
      if (res.status > StatusCode.ClientErrorBadRequest) {
        Swal.fire('Server Error!');
        return;
      }
      console.log(res);
      return res;
    })
    .catch(() => Swal.fire('No Internet Connection'));
}

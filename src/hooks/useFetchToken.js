import getToken from "../helper/getToken";
import Swal from "sweetalert2";
import { StatusCode } from "status-code-enum";

const defaultOption = async () => {
  return getToken().then((token) => {
    const headersToken = {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    };
    return headersToken;
  });
};

export default async function fetchWithToken(url, options = {}) {
  const headers = await defaultOption();

  console.log(headers);

  const DEFAULT_OPTIONS = {
    headers: headers,
  };
  return fetch(url, { ...DEFAULT_OPTIONS, ...options })
    .then((res) => {
      if (res.status >= StatusCode.ServerErrorInternal) {
        Swal.fire("Server Internal Error");
        return;
      }
      if (res.status > StatusCode.ClientErrorBadRequest) {
        Swal.fire("Server Error!");
        return;
      }
      
      return res;
    })
    .catch(() => Swal.fire("No Internet Connection"));
}

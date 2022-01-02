import LoginComponent from "../Components/Login";
import useFetch from "../hooks/useFetch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { StatusCode } from "status-code-enum";
import { useHistory } from "react-router-dom";

/* eslint-disable */
const schema = yup.object().shape({
  username: yup
    .string()
    .strict(false)
    .trim("Please enter a valid username name")
    .required("Username is required")
    .min(3, "Username too short")
    .max(40, "Username too long"),
  password: yup
    .string()
    .trim("Please enter password")
    .required()
    .min(6)
    .max(20),
});

const Login = () => {
  const history = useHistory();

  //   const dispatch = useDispatch();
  //   const router = useRouter();
  const { handleSubmit, control, formState } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "firstError",
    shouldFocusError: false,
    resolver: yupResolver(schema),
  });

  const [errorFormLogin, serErrorFormLogin] = useState(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.replace("/");
    }
  }, []);

  const submit = async (data, event) => {
    event.preventDefault();

    try {
      setIsLoadingForm(true);
      const userData = await useFetch(
        `${process.env.REACT_APP_API_KEY}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      setIsLoadingForm(false);
      //   console.log(await userData.json());
      const responseData = await userData.json();
      if (userData.status === StatusCode.SuccessOK) {
        if (!responseData.token) {
          Swal.fire("Server Errorr 2");
        } else {
          const { token } = responseData;
          localStorage.setItem("token", token);
          history.push("/");
          //   dispatch(actions.authentication.setAuthenticated());
        }
      } else {
        serErrorFormLogin(responseData.msg);
      }
    } catch (err) {
      console.log(err.message);
      Swal.fire(`Server Error! 1`);
    }
  };

  return (
    <LoginComponent
      submit={submit}
      handleSubmit={handleSubmit}
      control={control}
      formState={formState}
      errorForm={errorFormLogin}
      isLoadingForm={isLoadingForm}
    />
  );
};

// const WithFormProvider = withFormStore(Login)(
//   FormStoreContainer.Provider,
//   FormStoreContainer
// );

export default Login;

// export default withAuthentication(WithFormProvider);

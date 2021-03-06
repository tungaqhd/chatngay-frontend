import RegisterComponent from "../Components/Register";
// import ThemeWrapper from "containers/themeWrapper";
// import adminTheme from "styles/theme/materialAdmin";
// import { createContainer } from "unstated-next";
// import UseForm from "../hooks/useFormHook";
import useFetch from "../hooks/useFetch";
// import withFormStore from "../hocs/withFormStore";
// import withAuthentication from "hocs/withAuthentication";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch } from "react-redux";
// import actions from "stores/actions";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { StatusCode } from "status-code-enum";
// import { StatusCode } from "status-code-enum";
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
  name: yup
    .string()
    .strict(false)
    .trim("Please enter a valid full name")
    .required("Full name is required")
    .min(4, "Full name too short")
    .max(80, "Full name too long"),
  email: yup
    .string()
    .required("Please enter a valid email address")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .trim("Please enter password")
    .required()
    .min(6)
    .max(20),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Please enter valid password")
    .required("Please enter a valid data"),
});

const Login = () => {
  const history = useHistory();

  //   const dispatch = useDispatch();
  //   const router = useRouter();
  const { handleSubmit, control, formState } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    shouldFocusError: false,
    resolver: yupResolver(schema),
  });

  const [errorFormLogin, serErrorFormLogin] = useState(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.replace("/")
      // dispatch(actions.authentication.setAuthenticated());
    }
  }, []);

  const submit = async (data, event) => {
    event.preventDefault();
    // history.push("/");

    try {
      setIsLoadingForm(true);
      const userData = await useFetch(
        `${process.env.REACT_APP_API_KEY}/auth/register`,
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
          Swal.fire("Server Error");
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
      Swal.fire(`Server Error!`);
    }
  };

  return (
    <RegisterComponent
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

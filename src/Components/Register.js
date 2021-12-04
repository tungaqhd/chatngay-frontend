import React from "react";
import { TextField } from "@material-ui/core";
// import { FormStoreContainer } from "../features/Login";
import { Controller } from "react-hook-form";
import ButtonLoading from "./common/ButtonLoading";
import styled from "styled-components";

export default function Register({
  submit,
  errorForm,
  handleSubmit,
  control,
  formState,
  isLoadingForm,
}) {
  // const {
  //   isLoading,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = FormStoreContainer.useContainer();
  const { errors } = formState;

  return (
    <Container>
      <div className="mask">
        {/* <div className="login__logo">
          <img src="/netflix_logo.png" alt="" />
        </div> */}
        <form onSubmit={handleSubmit(submit)}>
          {/* <button className="login__signInButton">Sign In</button> */}

          <h1>Sign up</h1>
          <h3 className="errorFormMsg">{errorForm}</h3>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  error={!!errors.username}
                  variant="filled"
                  label={errors.username?.message || "Username"}
                  placeholder="Enter your username"
                  size="medium"
                  className="textField"
                  fullWidth
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  error={!!errors.name}
                  variant="filled"
                  label={errors.name?.message || "Full name"}
                  placeholder="Enter your full name"
                  size="medium"
                  className="textField"
                  fullWidth
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  error={!!errors.email}
                  variant="filled"
                  label={errors.email?.message || "Email"}
                  placeholder="Enter your email"
                  size="medium"
                  className="textField"
                  fullWidth
                  {...field}
                />
              );
            }}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                type="password"
                variant="filled"
                label={errors.password?.message || "Password"}
                placeholder="Enter your password"
                size="medium"
                error={!!errors.password}
                className="textField"
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                type="password"
                variant="filled"
                label={errors.confirm_password?.message || "Confirm password"}
                placeholder="Enter your password"
                size="medium"
                error={!!errors.confirm_password}
                className="textField"
                fullWidth
                {...field}
              />
            )}
          />

          <ButtonLoading
            messageLoading="Processing..."
            isLoading={isLoadingForm}
            variant="contained"
            type="submit"
            className="buttonLoading"
          >
            Register
          </ButtonLoading>

          <p className="signIn">
            <span className="text-darkBlueCustom">
              You don&apos;t have an account?
            </span>

            <a
              href="/login"
              className="no-underline ml-1 font-semibold text-blueCustom"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  background: url("https://assets.nflxext.com/ffe/siteui/vlv3/5a27cb25-33a9-4bcc-b441-95fefabcbd37/6bdbf132-dd7b-4d42-8f84-9139f9c4eaac/VN-en-20210823-popsignuptwoweeks-perspective_alpha_website_large.jpg")
    center center no-repeat;
  background-size: cover;

  .errorFormMsg {
    color: red;
  }

  .mask {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }

  form {
    box-sizing: border-box;
    padding: 20px 72px 40px 72px;
    border-radius: 0.75rem;
    /* min-height: 660px; */
    /* background-color: blue; */
    width: 520px;
    height: 760px;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 4px;

    display: flex;
    flex-direction: column;

    .MuiFormControl-root {
      margin-top: 2rem;
      color: white !important;
    }
    h1 {
      line-height: 1em;
      padding: 10px;
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.55);
      border: 0;
      color: #fff;
      width: 100%;
      max-width: 100%;
      border-radius: 4px;
      font-weight: 700;
      /* margin-top: 44px; */
    }
    .textField {
      background-color: #454545 !important;
      color: white !important;
      border-radius: 0.4rem;
    }
    .textField::-webkit-input-placeholder {
      color: red !important;
    }
    .buttonLoading {
      padding: 0.8rem 0;
      color: white;
      background-color: #e50914;
      font-weight: 600;
      margin-top: 3rem;
    }
    .forgotPass {
      text-align: right;
      text-decoration: none;
      color: #8c8c8c;
      margin-bottom: 2rem;
      margin-top: 0.2rem;
    }
    p:last-child {
      margin-top: 2rem;
      color: #8c8c8c;
      text-align: center;
      a {
        color: white;
        text-decoration: none;
        margin-left: 4px;
      }
    }
  }
`;

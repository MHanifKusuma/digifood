import Button from "components/shared-components/Button";
import { CustomForm, ErrorMessage } from "components/shared-style";
import { RegisterInput } from "interfaces/FormInput";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationWrapper, {
  AuthenticationForm,
  AuthenticationLogo,
} from "../style";
import logo from "assets/logo.webp";
import Navbar from "components/shared-components/Navbar";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegisterInput>();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    try {
      const res = await fetch(`http://localhost:8080/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) {
          if (res.status === 409) {
            res.json().then((data) => setError(data.message));
          } else {
            setError("unexpected error occured, please try again later");
          }
          throw new Error();
        }

        return res.json();
      });

      navigate("/login", { replace: false });
    } catch (error) {}
  };
  return (
    <div>
      <Navbar />
      <AuthenticationWrapper className="py-5 container-fluid">
        <AuthenticationLogo>
          <img src={logo} alt={"logo"} />
          <h1>DigiFood</h1>
        </AuthenticationLogo>
        <AuthenticationForm>
          <h1 className="text-center">Register</h1>

          <CustomForm className="py-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12 col-md-6 mx-auto">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  placeholder="Full name"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName?.type === "required" && (
                  <ErrorMessage>Full name is required</ErrorMessage>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 mx-auto">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <ErrorMessage>Email is required</ErrorMessage>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 mx-auto">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="phoneInput"
                  placeholder="Phone"
                  {...register("phone", { required: true })}
                />
                {errors.phone?.type === "required" && (
                  <ErrorMessage>Phone number is required</ErrorMessage>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 mx-auto">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
                {errors.username?.type === "required" && (
                  <ErrorMessage>Username is required</ErrorMessage>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 mx-auto">
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <ErrorMessage>Password is required</ErrorMessage>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 mx-auto">
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPasswordInput"
                  placeholder="Confirm password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value: string) => {
                      if (watch("password") != value) {
                        return "Password does not match";
                      }
                    },
                  })}
                />
                {errors.confirmPassword?.type === "required" && (
                  <ErrorMessage>Confirm password is required</ErrorMessage>
                )}
                {errors.confirmPassword?.message && (
                  <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 mx-auto">
              <div className="mb-3">
                <Button
                  btnStyle={{
                    width: "100%",
                    backgroundColor: "#579EFF",
                    color: "#FFFFFF",
                  }}
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </div>
            <div className="col-12 col-md-6 mx-auto">
              <div className="mb-3">
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <p className="text-center">
                  Already have an account?{" "}
                  <span>
                    {" "}
                    <Link to={"/login"}>Login</Link>{" "}
                  </span>{" "}
                </p>
              </div>
            </div>
          </CustomForm>
        </AuthenticationForm>
      </AuthenticationWrapper>
    </div>
  );
};

export default Register;

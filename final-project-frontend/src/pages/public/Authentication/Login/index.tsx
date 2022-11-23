import Button from "components/shared-components/Button";
import { CustomForm, ErrorMessage } from "components/shared-style";
import { LoginInput } from "interfaces/FormInput";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationWrapper, {
  AuthenticationForm,
  AuthenticationLogo,
} from "../style";
import logo from "assets/logo.webp";
import { useCookies } from "react-cookie";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInput>();

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["login"]);

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const res = await fetch(`http://localhost:8080/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) {
          if (res.status === 403) {
            setError("Wrong password");
          } else if (res.status === 404) {
            setError("User not found");
          } else {
            setError("An error has occured, pleas try again later");
          }
          throw new Error();
        }

        return res.json();
      });

      setCookie("login", res.data.Token, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      navigate("/", { replace: false });
    } catch (error) {
    } finally {
      reset();
    }
  };

  return (
    <AuthenticationWrapper className="py-5 container-fluid">
      <AuthenticationLogo>
        <img src={logo} alt={"logo"} />
        <h1>DigiFood</h1>
      </AuthenticationLogo>
      <AuthenticationForm>
        <h1 className="text-center">Login</h1>

        <CustomForm className="py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 col-md-6 mx-auto">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="loginInput"
                placeholder="Phone/username/email"
                {...register("login", { required: true })}
              />
              {errors.login?.type === "required" && (
                <ErrorMessage>Login info is required</ErrorMessage>
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
                <ErrorMessage>Password is Required</ErrorMessage>
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
              >
                Login
              </Button>
            </div>
          </div>
          <div className="col-12 col-md-6 mx-auto">
            <div className="mb-3">
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <p className="text-center">
                Don't have an account?{" "}
                <span>
                  {" "}
                  <Link to={"/register"}>Sign Up</Link>{" "}
                </span>{" "}
              </p>
            </div>
          </div>
        </CustomForm>
      </AuthenticationForm>
    </AuthenticationWrapper>
  );
};

export default Login;

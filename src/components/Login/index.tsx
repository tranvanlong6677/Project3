import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { routesObj } from "../../utils/routes";
import { LoginRequestBody } from "../../utils/requestBody";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/services/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<LoginRequestBody>();

  const onSubmit: SubmitHandler<LoginRequestBody> = async (
    data: LoginRequestBody
  ) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await dispatch(loginThunk(data));
      console.log("res", response);

      // eslint-disable-next-line no-unsafe-optional-chaining
      if (
        response.payload.result &&
        response.payload.message === "Login successful"
      ) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { access_token, refresh_token } = response?.payload?.result;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("user", JSON.stringify(response.payload.user));

        toast.success(response.payload.message);
        if (access_token && refresh_token) {
          // dispatch
          navigate(routesObj.home);
        }
      }
      // link đến trang chính khi đăng nhập thành công
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Sai email hoặc mật khẩu");
    }
  };
  useEffect(() => {
    // testAxios();
  }, []);
  return (
    <div className="login-container container h-100vh p-5">
      <Form className="w-100 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <Row className="w-100 mb-2">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <h2 className="text-center">Login</h2>
            <h5 className="text-center">
              Please enter your name and password.
            </h5>
          </Col>
        </Row>
        <Row className="w-100 mb-3">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="w-100 mb-3">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="w-100">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <Button variant="success" type="submit" className="w-100">
              Login
            </Button>

            <hr />
            <Button
              variant="outline-success"
              type="button"
              className="w-100 mt-5"
              onClick={() => navigate(routesObj.register)}
            >
              Sign up
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;

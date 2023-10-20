import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { authApi } from "../../api/authApi";

const Login = () => {
  const testAxios = async () => {
    const test = await authApi.login({
      email: "tranvanlong16@gmail.com",
      password: "Long6677@",
    });
    console.log(test);
  };
  useEffect(() => {
    testAxios();
  }, []);
  return (
    <div className="login-container container h-100vh p-5">
      <Form className="w-100 mx-auto">
        <Row className="w-100 mb-2">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <h2 className="text-center">Login</h2>
            <h5 className="text-center">
              Please enter your name and password.
            </h5>
          </Col>
        </Row>
        <Row className="w-100">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Nhập email" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="w-100">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control type="password" placeholder="Nhập mật khẩu" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="w-100">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <Button variant="success" type="submit" className="w-100">
              Đăng nhập
            </Button>

            <a className="forgot text-center d-block mt-5">
              Forgotten password
            </a>
            <hr />
            <Button
              variant="outline-success"
              type="button"
              className="w-100 mt-5"
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

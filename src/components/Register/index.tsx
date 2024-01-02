import { Button, Col, Form, Row } from "react-bootstrap";
import { authApi } from "../../api/authApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { routesObj } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
import { RegisterRequestBody } from "../../utils/requestBody";
import DatePicker from "react-datepicker";
import { useState } from "react";

const Register = () => {
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<RegisterRequestBody>();

  const onSubmit: SubmitHandler<RegisterRequestBody> = async (
    data: RegisterRequestBody
  ) => {
    const dataClone = { ...data, date_of_birth: new Date(data.date_of_birth) };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await authApi.register(dataClone);
      await toast.success(response.message);
      await navigate(routesObj.login);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const dataErrors = error?.response?.data?.errors;
      toast.error(dataErrors[Object.keys(dataErrors)[0]].msg);
    }
  };

  return (
    <div className="register-container container h-100vh p-5">
      <Form className="w-100 mx-auto mb-2" onSubmit={handleSubmit(onSubmit)}>
        <Row className="w-100">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <h2 className="text-center">Register</h2>
            <h5 className="text-center">Register as a new member.</h5>
          </Col>
        </Row>
        <Row className="w-100 mb-3">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <Form.Group className="" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
            </Form.Group>
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
            <Form.Group className="" controlId="formBasicDateOfBirth">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                style={{ display: "none" }}
                type="text"
                placeholder="Date of birth"
                {...register("date_of_birth", { required: true })}
                value={dateOfBirth.toString()}
              />
            </Form.Group>
            <DatePicker
              className="form-control date-picker"
              selected={dateOfBirth}
              onChange={(date: Date) => {
                setDateOfBirth(date);
              }}
              showYearDropdown
              scrollableYearDropdown
              dateFormat="dd/MM/yyyy"
              yearDropdownItemNumber={100} // Số lượng năm hiển thị trong dropdown
              minDate={new Date(1900, 0, 1)} // Năm tối thiểu có thể chọn
              maxDate={new Date()}
            />
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
        <Row className="w-100 mb-3">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <Form.Group className="" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                {...register("confirm_password", { required: true })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="w-100 mb-3">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <Form.Group className="" controlId="formBasicPhoneNumber">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone number"
                {...register("phone_number", { required: true })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="w-100">
          <Col sm={12} md={10} lg={7} className="mx-auto">
            <Button variant="success" type="submit" className="w-100">
              Sign up
            </Button>

            <hr />
            <Button
              variant="outline-success"
              type="button"
              className="w-100 mt-5"
              onClick={() => navigate(routesObj.login)}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Register;

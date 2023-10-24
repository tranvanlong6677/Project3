import { Button, Container, Form } from "react-bootstrap";
import ListCars from "../ListCars";
import DatePicker from "react-datepicker";
import { useState } from "react";

const Home = () => {
  const [dateBookCarStart, setDateBookCarStart] = useState<Date>();
  const [dateBookCarEnd, setDateBookCarEnd] = useState<Date>();

  return (
    <Container className="home-wrapper">
      <Form className="search mt-3 w-100">
        <div className="d-flex w-100 flex-wrap gap-2 gap-md-0">
          <div className="col-12 col-md-6">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Tỉnh, thành phố:</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">Hà Nội</option>
                <option value="2">Địa chỉ</option>
                <option value="2">Ngày đặt xe</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-12 col-md-6">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Quận, huyện:</Form.Label>

              <Form.Select aria-label="Default select example">
                <option value="1">Cầu Giấy</option>
                <option value="2">Địa chỉ</option>
                <option value="2">Ngày đặt xe</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className="d-flex w-100 flex-wrap gap-2 gap-md-0">
          <div className="col-12 col-md-6">
            <Form.Group className="mt-3 w-90 mx-auto">
              <Form.Label className="col-12">Ngày bắt đầu:</Form.Label>
              <DatePicker
                placeholderText="Ngày bắt đầu"
                className="form-control date-picker"
                selected={dateBookCarStart}
                onChange={(date: Date) => {
                  setDateBookCarStart(new Date(date));
                }}
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6">
            <Form.Group className="mt-3 w-90 mx-auto">
              <Form.Label className="col-12">Ngày kết thúc:</Form.Label>
              <DatePicker
                placeholderText="Ngày kết thúc"
                className="form-control date-picker"
                selected={dateBookCarEnd}
                onChange={(date: Date) => {
                  setDateBookCarEnd(new Date(date));
                }}
              />
            </Form.Group>
          </div>
        </div>
        <div className="col-12 col-md-6 my-3">
          <Form.Group className="w-90 mx-auto">
            <Form.Label>Tên xe:</Form.Label>
            <Form.Control className="" type="text" placeholder="Tên xe" />
          </Form.Group>
        </div>
        <div className="col-12 col-md-6 my-3">
          <div className="w-90 mx-auto">
            <Button variant="primary" type="button" className="">
              Tìm kiếm
            </Button>
          </div>
        </div>
      </Form>
      <ListCars />
    </Container>
  );
};
export default Home;

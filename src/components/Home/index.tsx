/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, Form } from "react-bootstrap";
import ListCars from "../ListCars";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProvinceThunk,
  getDistrictByProvinceThunk,
  getWardByDistrictThunk,
} from "../../redux/services/userSlice";

const Home = () => {
  const { province, district, ward } = useSelector(
    (state: any) => state.userReducer
  );
  const dispatch = useDispatch();

  const [dateBookCarStart, setDateBookCarStart] = useState<Date>();
  const [dateBookCarEnd, setDateBookCarEnd] = useState<Date>();

  const handleChangeProvince = async (value: string) => {
    await dispatch(getDistrictByProvinceThunk(value));
    dispatch(getWardByDistrictThunk("-1"));
  };
  const handleChangeDistrict = async (value: string) => {
    dispatch(getWardByDistrictThunk(value));
  };
  const fetchDataDefault = () => {
    dispatch(getAllProvinceThunk());
    dispatch(getDistrictByProvinceThunk("01"));
    dispatch(getWardByDistrictThunk("001"));
  };
  useEffect(() => {
    fetchDataDefault();
  }, []);
  return (
    <Container className="home-wrapper">
      <Form className="search mt-3 w-100">
        <div className="d-flex w-100 flex-wrap gap-2 gap-md-0">
          <div className="col-12 col-md-6">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Tỉnh, thành phố:</Form.Label>
              <Form.Select
                defaultValue={"01"}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onChange={(event: any) =>
                  handleChangeProvince(event.target.value)
                }
              >
                {province &&
                  province.length &&
                  province?.map((item: any, index: number) => {
                    return (
                      <option
                        value={`${item?.code}`}
                        key={`index-${index}`}
                        selected={item?.code === "01"}
                      >
                        {item.name_with_type}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-12 col-md-6">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Quận, huyện:</Form.Label>

              <Form.Select
                defaultValue={"001"}
                onChange={(event: any) =>
                  handleChangeDistrict(event.target.value)
                }
              >
                {district &&
                  district.length &&
                  district?.map((item: any, index: number) => {
                    return (
                      <option value={`${item?.code}`} key={`index-${index}`}>
                        {item.name_with_type}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className="d-flex w-100 flex-wrap gap-2 gap-md-0">
          <div className="col-12 col-md-6">
            <Form.Group className="w-90 mx-auto mt-3">
              <Form.Label>Thị xã:</Form.Label>

              <Form.Select aria-label="Default select example">
                {ward &&
                  ward.length &&
                  ward?.map((item: any, index: number) => {
                    return (
                      <option value={`${item?.code}`} key={`index-${index}`}>
                        {item.name_with_type}
                      </option>
                    );
                  })}
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

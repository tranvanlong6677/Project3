import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { SubmitHandler, useForm } from "react-hook-form";
import { BookingCarType } from "../../utils/requestBody";
import { bookingCarThunk } from "../../redux/services/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { routesObj } from "../../utils/routes";
import { differenceInDays } from "date-fns";
import { AxiosError } from "axios";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carDataBooking } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.userReducer
  );
  const {
    // register,
    handleSubmit,
  } = useForm<BookingCarType>();

  const [dateBookCarStart, setDateBookCarStart] = useState<Date>();
  const [dateBookCarEnd, setDateBookCarEnd] = useState<Date>();
  const onSubmit: SubmitHandler<BookingCarType> = async () => {
    const data = {
      start_date: dateBookCarStart?.toDateString() || "",
      end_date: dateBookCarEnd?.toDateString() || "",
      ownerId: carDataBooking.owner_id,
      carId: carDataBooking._id,
    };
    const quantityOfDate = differenceInDays(
      new Date(data.end_date),
      new Date(data.start_date)
    );
    if (differenceInDays(new Date(data.start_date), new Date()) < 0) {
      toast.error("Ngày bắt đầu không hợp lệ");
      return;
    }
    if (differenceInDays(new Date(data.start_date), new Date()) > 7) {
      toast.error("Bạn chỉ được đặt trước ngày khởi hành tối đa là 7 ngày");
      return;
    }
    if (quantityOfDate > 14) {
      toast.error(
        "Khoảng cách giữa ngày bắt đầu và kết thúc phải trong khoảng 14 ngày"
      );
      return;
    }
    if (quantityOfDate < 0) {
      toast.error("Ngày bắt đầu và ngày kết thúc không hợp lệ");
      return;
    }
    const res = await dispatch(bookingCarThunk(data));

    if (res.payload instanceof AxiosError) {
      toast.error(res?.payload?.response?.data?.message);
    } else {
      toast.success(res?.payload?.message);
      navigate(routesObj.home);
    }

    // await userApi.bookingCar(data);
  };
  useEffect(() => {
    const currentDate = new Date();
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    setDateBookCarStart(currentDate);
    setDateBookCarEnd(nextDate);
  }, [carDataBooking]);
  return (
    <div className="container mt-5">
      <div className="d-flex flex-column align-items-center">
        <h1>Chi tiết đặt xe</h1>
        <div className="img-car my-3">
          <img
            src={`http://localhost:8888/static/image/${carDataBooking._id}.jpg`}
            style={{
              height: "400px",
              objectFit: "cover",
              width: "100%",
              objectPosition: "center",
              margin: "0 auto",
              display: "block",
            }}
          />
        </div>
        <div className="note d-flex">
          <b>
            <span style={{ color: "red", fontSize: "16px" }}>*</span>
            Chú ý
          </b>
          <ul>
            <li>
              <b>Chỉ được đặt xe trước nhiều nhất 7 ngày</b>
            </li>
            <li>
              <b>Thời gian thuê tối đa là 14 ngày</b>
            </li>
          </ul>
        </div>
        <div className="submit d-flex gap-5">
          <div className="information-wrapper">
            <div className="element">
              <span className="field">Tên xe : </span>
              <span className="value">{carDataBooking.name}</span>
            </div>
            <div className="element">
              <span className="field">ID chủ xe : </span>
              <span className="value">{carDataBooking.owner_id}</span>
            </div>
            <div className="element">
              <span className="field">Tên chủ xe : </span>
              <span className="value">{carDataBooking.owner_name}</span>
            </div>
            <div className="element">
              <span className="field">Số điện thoại chủ xe : </span>
              <span className="value">{carDataBooking.phone_number}</span>
            </div>
            <div className="element">
              <span className="field">Hãng xe : </span>
              <span className="value">{carDataBooking.company}</span>
            </div>

            <div className="element">
              <span className="field">Địa chỉ : </span>
              <span className="value">{carDataBooking.addressString}</span>
            </div>

            <div className="element">
              <span className="field">Số tiền thuê : </span>
              <span className="value">
                {(+carDataBooking.price_per_day).toLocaleString()} VNĐ/ngày
              </span>
            </div>
            <div className="element">
              <span className="field">Số tiền cọc : </span>
              <span className="value">
                {(+carDataBooking.deposit).toLocaleString()} VNĐ
              </span>
            </div>

            <div className="element">
              <span className="field">Biển số xe : </span>
              <span className="value">{carDataBooking.license_plate}</span>
            </div>

            <div className="element">
              <span className="field">Số lượng chuyến : </span>
              <span className="value">{carDataBooking.quantity_of_trips}</span>
            </div>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mt-3 mx-auto">
              <Form.Label className="col-12">Ngày bắt đầu:</Form.Label>
              <DatePicker
                placeholderText="Ngày bắt đầu"
                className="form-control date-picker"
                selected={dateBookCarStart}
                // {...register("start_date", { required: true })}
                onChange={(date: Date) => {
                  setDateBookCarStart(new Date(date));
                }}
              />
              {/* <Form.Control
              className="d-none"
              type="text"
              value={dateBookCarStart?.toDateString()}
              {...register("start_date", { required: true })}
            /> */}
            </Form.Group>
            <Form.Group className="mt-3 mx-auto">
              <Form.Label className="col-12">Ngày kết thúc:</Form.Label>
              <DatePicker
                placeholderText="Ngày kết thúc"
                className="form-control date-picker w-100"
                selected={dateBookCarEnd}
                onChange={(date: Date) => {
                  setDateBookCarEnd(new Date(date));
                }}
              />
              {/* <Form.Control
              className="d-none"
              type="text"
              value={dateBookCarEnd?.toDateString()}
              {...register("end_date", { required: true })}
            /> */}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 my-3">
              Đặt xe
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Index;

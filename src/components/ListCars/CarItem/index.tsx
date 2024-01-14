import { Button, Card, Modal } from "react-bootstrap";
import { ImLocation2 } from "react-icons/im";
import { FaChartColumn } from "react-icons/fa6";
import { IDataCarItem } from "../../../utils/childrenProps";
import { listDistricts } from "../../../utils/districts";
import { useEffect, useState } from "react";
import { routesObj } from "../../../utils/routes";
import { useNavigate } from "react-router-dom";
import { setCarDataBooking } from "../../../redux/services/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import ListCars from "..";
const CarItem = ({ data }: { data: IDataCarItem }) => {
  console.log("check", data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.userReducer
  );
  console.log("user", user);
  const [addressString, setAddressString] = useState<string>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClickBtnBooking = () => {
    navigate(routesObj.bookingCar);
    dispatch(setCarDataBooking(data));
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listDistricts?.forEach((item: any) => {
      if (
        item?.code === data?.address?.districtCode &&
        item?.parent_code === data?.address?.provinceCode
      ) {
        setAddressString(item?.path);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <>
      <div
        className="col-12 col-sm-6 col-lg-3 mb-3 car-item-container"
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleShow();
        }}
      >
        <Card className="w-90 mx-auto">
          <div
            className="img-container"
            style={{
              height: "200px",
            }}
          >
            <Card.Img
              variant="top"
              src={data?.image}
              className="mh-50"
              style={{
                height: "100%",
                objectFit: "cover",
                width: "100%",
                objectPosition: "center",
              }}
            />
          </div>
          <Card.Body>
            <Card.Title>
              {data.name}
              {"   "}
              {data?.owner_id === user?._id ? (
                <b style={{ color: "red", fontSize: "16px" }}>(Xe của bạn)</b>
              ) : (
                <></>
              )}
            </Card.Title>
            <Card.Text>
              <ImLocation2 />
              <span className="location">{addressString}</span>
            </Card.Text>
            <hr />
            <Card.Text>
              <FaChartColumn />
              <span className="trips-quantity mx-2">
                {data.quantity_of_trips}
                {" chuyến"}
              </span>
              <br />
              <span className="price mx-4 mx-sm-2 mx-lg-0">
                <b>{data.price_per_day / 1000}K</b>/ngày
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal-infor-car"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="img-car">
            <img
              src={`http://localhost:8888/static/image/${data._id}.jpg`}
              style={{
                height: "300px",
                objectFit: "cover",
                width: "400px",
                objectPosition: "center",
                margin: "0 auto",
                display: "block",
              }}
            />
          </div>
          <div className="information">
            <div className="element">
              <span className="field">Tên xe : </span>
              <span className="value">{data.name}</span>
            </div>
            <div className="element">
              <span className="field">ID chủ xe : </span>
              <span className="value">{data.owner_id}</span>
            </div>
            <div className="element">
              <span className="field">Tên chủ xe : </span>
              <span className="value">{data.owner_name}</span>
            </div>
            <div className="element">
              <span className="field">Số điện thoại chủ xe : </span>
              <span className="value">{data.phone_number}</span>
            </div>
            <div className="element">
              <span className="field">Hãng xe : </span>
              <span className="value">{data.company}</span>
            </div>

            <div className="element">
              <span className="field">Địa chỉ : </span>
              <span className="value">{data.addressString}</span>
            </div>

            <div className="element">
              <span className="field">Số tiền thuê : </span>
              <span className="value">
                {(+data.price_per_day).toLocaleString()} VNĐ/ngày
              </span>
            </div>
            <div className="element">
              <span className="field">Số tiền cọc : </span>
              <span className="value">
                {(+data.deposit).toLocaleString()} VNĐ
              </span>
            </div>

            <div className="element">
              <span className="field">Biển số xe : </span>
              <span className="value">{data.license_plate}</span>
            </div>

            <div className="element">
              <span className="field">Số lượng chuyến : </span>
              <span className="value">{data.quantity_of_trips}</span>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleClickBtnBooking}>
            Đặt xe
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarItem;

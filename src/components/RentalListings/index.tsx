import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  completeOrderThunk,
  getRentalListingsThunk,
} from "../../redux/services/userSlice";
import { toast } from "react-toastify";

const Index = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { rentalListings } = useSelector((state: any) => state.userReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataModal, setDataModal] = useState<any>();
  const [show, setShow] = useState(false);
  const [rentalListingsState, setRentalListingsState] = useState([]);
  const handleClose = () => {
    setShow(false);
    setDataModal(null);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleShow = (data: any) => {
    setShow(true);
    setDataModal(data);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickDone = async (data: any) => {
    console.log(data);
    try {
      const result = await dispatch(
        completeOrderThunk({ booking_id: data._id, car_id: data.carId })
      );
      await dispatch(getRentalListingsThunk());
      console.log(result);
      toast.success(result.payload.message);
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    dispatch(getRentalListingsThunk());
  }, [dispatch]);
  useEffect(() => {
    setRentalListingsState(rentalListings);
  }, [rentalListings]);
  return (
    <div className="container mt-5">
      <h1>Danh sách đơn </h1>
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ID đơn</th>
              <th>Tên xe</th>
              <th>Chủ xe</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {rentalListingsState && rentalListingsState?.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
              rentalListingsState?.map((item: any, index: number) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item._id}</td>
                    <td>{item?.car_info[0]?.name}</td>
                    <td>{item?.car_info[0]?.owner_name}</td>
                    <td className="d-flex gap-3">
                      <Button
                        variant="primary"
                        onClick={() => handleShow(item)}
                      >
                        Xem chi tiết
                      </Button>
                      {!item?.isDone ? (
                        <Button
                          variant="success"
                          onClick={() => {
                            handleClickDone(item);
                          }}
                        >
                          Hoàn thành
                        </Button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết đơn đặt xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="lg">
            <thead>
              <tr>
                <th>Địa chỉ</th>
                <th>Tên chủ xe</th>
                <th>Thời gian thuê</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dataModal?.car_info[0]?.addressString}</td>
                <td>{dataModal?.car_info[0]?.owner_name}</td>
                <td>
                  {dataModal?.start_date}-{dataModal?.end_date}
                </td>
                <td>{dataModal?.price}</td>
                <td>{dataModal?.isDone ? "Đã hoàn thành" : "Đang diễn ra"}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Index;

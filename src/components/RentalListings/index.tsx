import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  completeOrderThunk,
  getRentalListingsPaginateThunk,
} from "../../redux/services/userSlice";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { typeCars } from "../../utils/typeCars";

const Index = () => {
  const perPage = 5;
  const dispatch = useDispatch();
  const { rentalListingsPaginate, pageCountRentalListings, loading } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useSelector((state: any) => state.userReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataModal, setDataModal] = useState<any>();
  const [show, setShow] = useState(false);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  console.log("rentalListingsPaginate", rentalListingsPaginate);
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
    try {
      const result = await dispatch(
        completeOrderThunk({ booking_id: data._id, car_id: data.carId })
      );
      // await dispatch(getRentalListingsThunk());
      await fetchRentalListings(1, perPage);
      toast.success(result.payload.message);
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      console.log(error);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = async (event: any) => {
    setPageCurrent(event.selected + 1);
    await fetchRentalListings(event.selected + 1, perPage);
  };
  const fetchRentalListings = async (page: number, perPage: number) => {
    await dispatch(
      getRentalListingsPaginateThunk({ page: page, perPage: perPage })
    );
  };

  useEffect(() => {
    // dispatch(getRentalListingsThunk());
    // dispatch(getRentalListingsPaginateThunk(2, 5));
    fetchRentalListings(1, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mt-5">
      <h1>Danh sách đơn cho thuê</h1>
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ID đơn</th>
              <th>Tên xe</th>
              <th>Biển số xe</th>
              <th>Loại xe</th>
              <th>Nguời thuê xe</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {rentalListingsPaginate &&
            rentalListingsPaginate?.length > 0 &&
            loading === false ? (
              // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
              rentalListingsPaginate?.map((item: any, index: number) => {
                return (
                  <tr>
                    <td>{(pageCurrent - 1) * perPage + (index + 1)}</td>
                    <td>{item._id}</td>
                    <td>{item?.car_info?.name}</td>
                    <td>{item?.car_info?.license_plate}</td>
                    <td>{typeCars[+item?.car_info?.type_car - 1]?.name}</td>

                    <td>{item?.customer_info?.name}</td>
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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(pageCountRentalListings / 5)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết đơn đặt xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="lg">
            <thead>
              <tr>
                <th>Địa chỉ</th>
                <th>Người thuê xe</th>
                <th>Liên hệ</th>
                <th>Email</th>

                <th>Thời gian thuê</th>
                <th>Số tiền(VNĐ)</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dataModal?.car_info?.addressString}</td>
                <td>{dataModal?.customer_info?.name}</td>
                <td>{dataModal?.customer_info?.phone_number}</td>
                <td>{dataModal?.customer_info?.email}</td>

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

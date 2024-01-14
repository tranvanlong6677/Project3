import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrderThunk,
  completeOrderThunk,
  getRentalListingsPaginateThunk,
} from "../../redux/services/userSlice";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { typeCars } from "../../utils/typeCars";
import { AxiosError } from "axios";
import { differenceInDays, isAfter } from "date-fns";
import { formatDate } from "../../utils/function";

const Index = () => {
  const perPage = 5;
  const currentDate = new Date();
  const dispatch = useDispatch();
  const { rentalListingsPaginate, pageCountRentalListings, loading } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useSelector((state: any) => state.userReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataModal, setDataModal] = useState<any>();
  const [show, setShow] = useState(false);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
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
    const result = await dispatch(
      completeOrderThunk({ booking_id: data._id, car_id: data.carId })
    );
    console.log(result);

    if (result.payload instanceof AxiosError) {
      toast.error(result.payload?.response?.data?.message);
    } else {
      await fetchRentalListings(1, perPage);
      toast.success(result.payload?.message);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickCancel = async (item: any) => {
    const res = await dispatch(cancelOrderThunk({ bookingId: item?._id }));
    if (res.payload instanceof AxiosError) {
      toast.error("Hủy lịch thất bại");
    } else {
      toast.success(res.payload?.message);
      setPageCurrent(1);
      await dispatch(
        getRentalListingsPaginateThunk({ page: 1, perPage: perPage })
      );
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
      <h1 style={{ color: "#fff" }}>Danh sách đơn cho thuê</h1>
      <div className="table-wrapper">
        <Table striped bordered hover variant="light">
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
                  <tr key={`item-${index}`}>
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
                      {!item?.isDone &&
                      isAfter(currentDate, new Date(item?.end_date)) ? (
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
                      {isAfter(new Date(item?.start_date), currentDate) &&
                      differenceInDays(
                        new Date(item?.start_date),
                        currentDate
                      ) >= 2 ? (
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleClickCancel(item);
                          }}
                        >
                          Hủy lịch
                        </Button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : loading ? (
              <>Loading...</>
            ) : (
              <>Không có kết quả</>
            )}
          </tbody>
        </Table>
      </div>
      <div className="pagination-container">
        <ReactPaginate
          forcePage={pageCurrent - 1}
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
                <th>Người thuê xe</th>
                <th>Liên hệ</th>
                <th>Thời gian thuê</th>
                <th>Số tiền cọc(VNĐ)</th>
                <th>Số tiền thuê(VNĐ)</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dataModal?.car_info?.addressString}</td>
                <td>{dataModal?.customer_info?.name}</td>
                <td>{dataModal?.customer_info?.phone_number}</td>
                <td>
                  {dataModal?.start_date
                    ? formatDate(dataModal?.start_date)
                    : ""}
                  -{dataModal?.end_date ? formatDate(dataModal?.end_date) : ""}
                </td>
                <td>{(+dataModal?.car_info?.deposit).toLocaleString()}</td>

                <td>
                  {(
                    +dataModal?.price - +dataModal?.car_info?.deposit
                  ).toLocaleString()}
                </td>
                <td>
                  {dataModal?.isDone
                    ? "Đã hoàn thành"
                    : dataModal?.end_date
                    ? isAfter(currentDate, new Date(dataModal?.end_date))
                      ? "Quá hạn"
                      : "Đang diễn ra"
                    : ""}
                </td>
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

import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getListBookingPaginateThunk } from "../../redux/services/userSlice";
import ReactPaginate from "react-paginate";

const ListBooking = () => {
  const dispatch = useDispatch();
  const perPage = 5;
  const { listBookingPaginate, pageCountListBooking, loading } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.userReducer
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataModal, setDataModal] = useState<any>();
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const [show, setShow] = useState(false);

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
  const handlePageClick = async (event: any) => {
    console.log(event.selected + 1);
    setPageCurrent(event.selected + 1);
    await dispatch(
      getListBookingPaginateThunk({ page: event.selected + 1, perPage })
    );
  };
  const fetchListBooking = async (page: number, perPage: number) => {
    console.log(page, perPage);
    await dispatch(
      getListBookingPaginateThunk({ page: +page, perPage: perPage })
    );
  };
  useEffect(() => {
    fetchListBooking(1, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            {listBookingPaginate &&
            listBookingPaginate.length > 0 &&
            loading === false ? (
              // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
              listBookingPaginate?.map((item: any, index: number) => {
                return (
                  <tr>
                    <td>{(pageCurrent - 1) * 5 + (index + 1)}</td>
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
                      {/* {!item?.isDone ? (
                      <Button variant="success">Hoàn thành</Button>
                    ) : (
                      <></>
                    )} */}
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
        pageCount={Math.ceil(pageCountListBooking / 5)}
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

export default ListBooking;

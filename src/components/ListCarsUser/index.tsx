import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getListCarsUserThunk } from "../../redux/services/userSlice";

const Index = () => {
  const perPage = 5;
  const { listCarsUser, totalCountListCarsUser } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.userReducer
  );
  const dispatch = useDispatch();
  const [pageCurrent, setPageCurrent] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = async (e: any) => {
    setPageCurrent(e.selected + 1);
    await dispatch(getListCarsUserThunk({ page: e.selected + 1, perPage }));
  };
  useEffect(() => {
    dispatch(getListCarsUserThunk({ page: 1, perPage }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mt-5">
      <h1>Danh sách xe sở hữu</h1>

      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên xe</th>
              <th>Biển số xe</th>
              <th>Giá thuê (VNĐ/ngày)</th>
              <th>Tiền cọc</th>
              <th>Số chuyến</th>
            </tr>
          </thead>
          <tbody>
            {listCarsUser && listCarsUser?.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
              listCarsUser.map((item: any, index: number) => {
                return (
                  <tr>
                    <td>{index + 1 + perPage * (pageCurrent - 1)}</td>
                    <td>{item?.name}</td>
                    <td>{item?.license_plate}</td>
                    <td>{item?.price_per_day}</td>
                    <td>{item?.deposit}</td>
                    <td>{item?.quantity_of_trips}</td>
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
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(totalCountListCarsUser / 5)}
        // pageCount={10}
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
  );
};

export default Index;

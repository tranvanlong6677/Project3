/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import CarItem from "./CarItem";
import { IDataCarItem } from "../../utils/childrenProps";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getListCarsThunk } from "../../redux/services/userSlice";

const ListCars = () => {
  const perPage = 8;
  const dispatch = useDispatch();
  const { listCars, totalListCars } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.userReducer
  );
  // const [listCarState, setListCarState] = useState<any>();
  const fetchListCars = async () => {
    // const allCars = await userApi.getAllCars();
    // setListCarState(allCars);
    await dispatch(getListCarsThunk({ page: 1, perPage }));
  };
  const handlePageClick = async (event: any) => {
    await dispatch(getListCarsThunk({ page: event.selected + 1, perPage }));
  };
  useEffect(() => {
    fetchListCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="list-cars-wrapper d-flex mw-100 flex-wrap mt-5">
        {listCars && listCars.length ? (
          listCars?.map((item: IDataCarItem, index: number) => {
            return <CarItem data={item} key={`index${index}`} />;
          })
        ) : (
          <></>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={Math.ceil(+totalListCars / perPage)}
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
    </>
  );
};

export default ListCars;

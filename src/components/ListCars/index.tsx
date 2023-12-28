/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CarItem from "./CarItem";
import { IDataCarItem } from "../../utils/childrenProps";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  getListCarSearchThunk,
  getListCarsThunk,
} from "../../redux/services/userSlice";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { listProvinces } from "../../utils/provinces";

const ListCars = () => {
  const perPage = 4;
  const dispatch = useDispatch();
  const { listCars, totalListCars, loading } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.userReducer
  );
  const { register, handleSubmit } = useForm<any>();
  const [isSearchCar, setIsSearchCar] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [provinceCodeSelected, setProvinceCodeSelected] = useState("01");
  const fetchListCars = async () => {
    await dispatch(getListCarsThunk({ page: 1, perPage }));
  };
  const handlePageClick = async (event: any) => {
    setCurrentPage(event.selected);
    await dispatch(getListCarsThunk({ page: event.selected + 1, perPage }));
  };
  const handlePageClickSearch = async (event: any) => {
    setCurrentPage(event.selected);
    await dispatch(
      getListCarSearchThunk({
        provinceCode: provinceCodeSelected,
        page: event.selected + 1,
        perPage,
      })
    );
    console.log(event.selected + 1);
  };
  const onSubmit = async (data: { province_code: string }) => {
    console.log("check data", data.province_code);
    setIsSearchCar(true);
    setCurrentPage(0);
    await dispatch(
      getListCarSearchThunk({
        provinceCode: data.province_code,
        page: "1",
        perPage: perPage + "",
      })
    );
  };
  useEffect(() => {
    fetchListCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 col-md-6 my-3">
          <Form.Group className="mx-auto w-90">
            <Form.Label>Tỉnh, thành phố:</Form.Label>
            <Form.Select
              defaultValue={"01"}
              {...register("province_code", { required: true })}
              onChange={(event: any) => {
                console.log(event.target.value);
                setProvinceCodeSelected(event.target.value);
              }}
            >
              {listProvinces &&
                listProvinces.length &&
                listProvinces?.map((item: any, index: number) => {
                  return (
                    <option value={`${item?.code}`} key={`index-${index}`}>
                      {item.name_with_type}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-12 col-md-6 my-3">
          <div className="w-90 mx-auto">
            <Button variant="primary" type="submit" className="">
              Tìm kiếm
            </Button>
          </div>
        </div>
      </Form>
      <div className="list-cars-wrapper d-flex mw-100 flex-wrap mt-5">
        {listCars && listCars.length ? (
          !loading &&
          listCars?.map((item: IDataCarItem, index: number) => {
            return <CarItem data={item} key={`index${index}`} />;
          })
        ) : !loading ? (
          <div style={{ textAlign: "center", width: "100%" }} className="mb-3">
            Không có kết quả
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>
      <div className="pagination-container">
        <ReactPaginate
          breakLabel="..."
          forcePage={currentPage}
          nextLabel="next >"
          onPageChange={isSearchCar ? handlePageClickSearch : handlePageClick}
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
      </div>
    </>
  );
};

export default ListCars;

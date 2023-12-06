/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CarItem from "./CarItem";
import { userApi } from "../../api/userApi";
import { IDataCarItem } from "../../utils/childrenProps";

const ListCars = () => {
  // const dispatch: Dispatch<any> = useDispatch();
  const [listCars, setListCars] = useState<any>();
  const fetchAllCars = async () => {
    const allCars = await userApi.getAllCars();
    // console.log("allCars", allCars);
    setListCars(allCars);
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  return (
    <div className="list-cars-wrapper d-flex mw-100 flex-wrap mt-5">
      {listCars && listCars.length ? (
        listCars?.map((item: IDataCarItem, index: number) => {
          return <CarItem data={item} key={`index${index}`} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default ListCars;

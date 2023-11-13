export interface ChildrenProps {
  children: JSX.Element;
}
export interface IDataCarItem {
  _id: string;
  license_plate: string;
  company: string;
  price_per_day: number;
  status: boolean;
  deposit: number;
  type_car: string;
  address: {
    provinceCode: string;
    districtCode: string;
    wardCode: string;
  };
  quantity_of_trips: number;
  name: string;
  image: string;
  owner_id: string;
}

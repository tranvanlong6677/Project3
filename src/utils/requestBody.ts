export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface RegisterRequestBody {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  date_of_birth: Date;
  phone_number: string;
}

export interface UserInfoRequesstBody {
  address: {
    provinceCode: string;
    districtCode: string;
    wardCode: string;
  };
  email: string;
}

export interface LogoutRequestBody {
  refresh_token: string;
}

export interface CreateANewCarRequestBody {
  name: string;
  license_plate: string;
  company: string;
  price_per_day: number;
  deposit: number;
  type_car: number;
  image: FileList;
  status: boolean;
  quantity_of_trips: number;
  address: {
    provinceCode: string;
    districtCode: string;
    wardCode: string;
  };
  owner_id: string;
}
export interface BookingCarType {
  start_date: string;
  end_date: string;
  ownerId: string;
  carId: string;
}

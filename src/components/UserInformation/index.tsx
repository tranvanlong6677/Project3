/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserInfoRequesstBody } from "../../utils/requestBody";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProvinceThunk,
  getDistrictByProvinceThunk,
  updateUserInfoThunk,
} from "../../redux/services/userSlice";
import { useEffect, useState } from "react";

const UserInformation = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<UserInfoRequesstBody>();
  const { province, district, user } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.userReducer
  );
  const [name, setName] = useState(user?.name || "");
  const dispatch = useDispatch();
  const onSubmit = async (data: UserInfoRequesstBody) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await dispatch(
        updateUserInfoThunk({ ...data, email: user?.email })
      );
      toast.success(res.payload?.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const handleChangeProvince = async (value: string) => {
    await dispatch(getDistrictByProvinceThunk(value));
  };

  const fetchDataDefault = async () => {
    await dispatch(getAllProvinceThunk());
    await dispatch(getDistrictByProvinceThunk(user?.address?.provinceCode));
  };

  useEffect(() => {
    fetchDataDefault();
    setName(user?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  // useEffect(() => {
  //   handleChangeProvince(user?.address?.provinceCode);
  // }, []);
  return (
    <Container>
      <Form
        className="mt-3 w-100 form-user-info"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Thông tin người dùng</h2>
        <div className="d-flex w-100 flex-wrap gap-2 gap-md-0">
          <div className="col-12 col-md-6 my-3">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className=""
                type="email"
                placeholder="Email"
                disabled={true}
                value={user?.email}
                // {...register("email", { required: true })}
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6 my-3">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Số điện thoại:</Form.Label>
              <Form.Control
                className=""
                type="text"
                placeholder="Số điện thoại"
                value={user?.phone_number}
                disabled={true}
                // {...register("phone_number", { required: true })}
              />
            </Form.Group>
          </div>
        </div>
        <div className="d-flex w-100 flex-wrap gap-2 gap-md-0">
          <div className="col-12 col-md-6 my-3">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Tên người dùng:</Form.Label>
              <Form.Control
                className=""
                type="text"
                placeholder="Tên người dùng"
                value={name}
                // disabled={true}
                {...register("name", { required: true })}
                onChange={(e: any) => setName(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6 my-3">
            <Form.Group className="mx-auto w-90">
              <Form.Label>Tỉnh, thành phố:</Form.Label>
              <Form.Select
                defaultValue={+user?.address?.provinceCode}
                {...register("address.provinceCode", { required: true })}
                onChange={(event: any) =>
                  handleChangeProvince(event.target.value)
                }
              >
                {province &&
                  province.length &&
                  province?.map((item: any, index: number) => {
                    return (
                      <option
                        value={`${item?.code}`}
                        key={`index-${index}`}
                        selected={item?.code === user?.address?.provinceCode}
                      >
                        {item.name_with_type}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-12 col-md-6 my-3">
            <Form.Group className="mx-auto w-90">
              <Form.Label>Quận, huyện:</Form.Label>

              <Form.Select
                defaultValue={+user?.address?.districtCode}
                {...register("address.districtCode", { required: true })}
              >
                {district &&
                  district.length &&
                  district?.map((item: any, index: number) => {
                    return (
                      <option
                        value={`${item?.code}`}
                        key={`index-${index}`}
                        selected={+item?.code === +user?.address?.districtCode}
                      >
                        {item.name_with_type}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className="col-12 col-md-6 my-3">
          <div className="w-90 mx-auto">
            <Button variant="primary" type="submit" className="">
              Cập nhật thông tin
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default UserInformation;

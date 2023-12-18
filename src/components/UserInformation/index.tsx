/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserInfoRequesstBody } from "../../utils/requestBody";
import { userApi } from "../../api/userApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProvinceThunk,
  getDistrictByProvinceThunk,
} from "../../redux/services/userSlice";
import { useEffect } from "react";

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
  console.log(">>> check user", user);
  const dispatch = useDispatch();
  const onSubmit = async (data: UserInfoRequesstBody) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(data);
      const res: any = await userApi.updateUserInfo({
        ...data,
        email: user.email,
      });
      toast.success(res?.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const handleChangeProvince = async (value: string) => {
    await dispatch(getDistrictByProvinceThunk(value));
  };

  const fetchDataDefault = () => {
    dispatch(getAllProvinceThunk());
    dispatch(getDistrictByProvinceThunk(user?.address?.provinceCode));
  };
  useEffect(() => {
    fetchDataDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Form className="search mt-3 w-100" onSubmit={handleSubmit(onSubmit)}>
        <h2>Thông tin người dùng</h2>
        <div className="d-flex w-100 flex-wrap gap-2 gap-md-0">
          <div className="col-12 col-md-6 my-3">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Tên người dùng:</Form.Label>
              <Form.Control
                className=""
                type="text"
                placeholder="Tên người dùng"
                value={user?.name}
                disabled={true}
                // {...register("name", { required: true })}
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6 my-3">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className=""
                type="email"
                placeholder="Email"
                value={user?.email}
                disabled={true}
                // {...register("email", { required: true })}
              />
            </Form.Group>
          </div>
        </div>
        <div className="d-flex w-100 flex-wrap gap-2 gap-md-0">
          <div className="col-12 col-md-6 my-3">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Số điện thoại:</Form.Label>
              <Form.Control
                className=""
                type="text"
                placeholder="Số điện thoại"
                value={user.phone_number}
                disabled={true}
                // {...register("phone_number", { required: true })}
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
                defaultValue={"001"}
                {...register("address.districtCode", { required: true })}
                onChange={(event: any) =>
                  handleChangeDistrict(event.target.value)
                }
              >
                {district &&
                  district.length &&
                  district?.map((item: any, index: number) => {
                    return (
                      <option value={`${item?.code}`} key={`index-${index}`}>
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

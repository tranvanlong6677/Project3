/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CreateANewCarRequestBody } from "../../utils/requestBody";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCarThunk,
  getAllProvinceThunk,
  getDistrictByProvinceThunk,
  getWardByDistrictThunk,
} from "../../redux/services/userSlice";
import { toast } from "react-toastify";
import { typeCars } from "../../utils/typeCars";
import { routesObj } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
const CreateNewCar = () => {
  const navigate = useNavigate();
  const { province, district, ward } = useSelector(
    (state: any) => state.userReducer
  );
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedImage, setSelectedImage] = useState<any>();
  const { register, handleSubmit } = useForm<CreateANewCarRequestBody>();
  const onSubmit = async (data: CreateANewCarRequestBody) => {
    const user = JSON.parse(
      (localStorage.getItem("user") as string)
        ? (localStorage.getItem("user") as string)
        : ""
    );

    try {
      const res = await dispatch(
        createCarThunk({ ...data, owner_id: user._id })
      );
      toast.success(res?.payload?.message);

      navigate(routesObj.home);
    } catch (error) {
      toast.error("Error");
    }
  };
  const handleChangeProvince = async (value: string) => {
    await dispatch(getDistrictByProvinceThunk(value));
    dispatch(getWardByDistrictThunk("-1"));
  };
  const handleChangeDistrict = async (value: string) => {
    dispatch(getWardByDistrictThunk(value));
  };
  const fetchDataDefault = () => {
    dispatch(getAllProvinceThunk());
    dispatch(getDistrictByProvinceThunk("01"));
    dispatch(getWardByDistrictThunk("001"));
  };
  useEffect(() => {
    fetchDataDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className="mt-3">
      <Form
        className=""
        onSubmit={handleSubmit(onSubmit)}
        encType="multiple/form-data"
      >
        <Form.Group className="mb-3" controlId="formBasicLicensePlate">
          <Form.Label>Tên xe</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLicensePlate">
          <Form.Label>Biển số xe</Form.Label>
          <Form.Control
            type="text"
            placeholder="License plate"
            {...register("license_plate", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCompany">
          <Form.Label>Hãng xe</Form.Label>
          <Form.Control
            type="text"
            placeholder="Company"
            {...register("company", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mx-auto mb-3">
          <Form.Label>Tỉnh, thành phố:</Form.Label>
          <Form.Select
            defaultValue={"01"}
            {...register("address.provinceCode", { required: true })}
            onChange={(event: any) => handleChangeProvince(event.target.value)}
          >
            {province &&
              province.length &&
              province?.map((item: any, index: number) => {
                return (
                  <option
                    value={`${item?.code}`}
                    key={`index-${index}`}
                    selected={item?.code === "01"}
                  >
                    {item.name_with_type}
                  </option>
                );
              })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mx-auto mb-3">
          <Form.Label>Quận, huyện:</Form.Label>

          <Form.Select
            defaultValue={"001"}
            {...register("address.districtCode", { required: true })}
            onChange={(event: any) => handleChangeDistrict(event.target.value)}
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

        <Form.Group className="mx-auto mb-3">
          <Form.Label>Thị xã:</Form.Label>

          <Form.Select
            aria-label="Default select example"
            {...register("address.wardCode", { required: true })}
          >
            {ward &&
              ward.length &&
              ward?.map((item: any, index: number) => {
                return (
                  <option value={`${item?.code}`} key={`index-${index}`}>
                    {item.name_with_type}
                  </option>
                );
              })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPricePerDay">
          <Form.Label>Số tiền/ngày (VNĐ)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price per day"
            {...register("price_per_day", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDeposit">
          <Form.Label>Tiền cọc (VNĐ)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Deposit"
            {...register("deposit", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTypeCar">
          <Form.Label>Loại xe</Form.Label>
          <Form.Select
            placeholder="Type car"
            {...register("type_car", { required: true })}
          >
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            {typeCars.map((item: any) => {
              return <option value={item.code}>{item.name}</option>;
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Ảnh xe</Form.Label>
          <Form.Control
            type="file"
            // placeholder="Image"
            {...register("image", { required: true })}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(event: any) => {
              setSelectedImage(event.target.files[0]);
            }}
          />
        </Form.Group>
        {selectedImage && (
          <div>
            <img
              className="mx-auto d-block w-25 mb-5"
              alt="not found"
              src={URL.createObjectURL(selectedImage)}
            />
          </div>
        )}
        <br />
        <br />
        <br />

        <Button variant="primary" type="submit" className="mx-auto d-block">
          Tạo xe mới
        </Button>
      </Form>
    </Container>
  );
};

export default CreateNewCar;

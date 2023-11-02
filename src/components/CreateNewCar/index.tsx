import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CreateANewCarRequestBody } from "../../utils/requestBody";
import { useState } from "react";
import { userApi } from "../../api/userApi";
const CreateNewCar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedImage, setSelectedImage] = useState<any>();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<CreateANewCarRequestBody>();
  const onSubmit = async (data: CreateANewCarRequestBody) => {
    console.log(data);
    const res = await userApi.createNewCar(data);
    console.log(">>> res", res);
  };
  return (
    <Container className="mt-3">
      <Form
        className=""
        onSubmit={handleSubmit(onSubmit)}
        encType="multiple/form-data"
      >
        <Form.Group className="mb-3" controlId="formBasicLicensePlate">
          <Form.Label>Biển số xe</Form.Label>
          <Form.Control
            type="text"
            placeholder="Biển số xe"
            {...register("license_plate", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCompany">
          <Form.Label>Hãng xe</Form.Label>
          <Form.Control
            type="text"
            placeholder="Hãng xe"
            {...register("company", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPricePerDay">
          <Form.Label>Số tiền/ngày (VNĐ)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Số tiền / ngày"
            {...register("price_per_day", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDeposit">
          <Form.Label>Tiền cọc (VNĐ)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Tiền cọc"
            {...register("deposit", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTypeCar">
          <Form.Label>Loại xe</Form.Label>
          <Form.Control
            type="text"
            placeholder="Loại xe"
            {...register("type_car", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Ảnh xe</Form.Label>
          <Form.Control
            type="file"
            // placeholder="Image"
            {...register("image", { required: true })}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(event: any) => {
              console.log(event.target.files[0]);
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

        <Button variant="primary" type="submit" className="mx-auto d-block">
          Tạo xe mới
        </Button>
      </Form>
    </Container>
  );
};

export default CreateNewCar;

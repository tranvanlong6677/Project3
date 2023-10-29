import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserInfoRequesstBody } from "../../utils/requestBody";
import { userApi } from "../../api/userApi";
import { toast } from "react-toastify";

const UserInformation = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<UserInfoRequesstBody>();
  const onSubmit = async (data: UserInfoRequesstBody) => {
    console.log(data);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await userApi.updateUserInfo(data);
      toast.success(res?.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Container>
      <Form className="search mt-3 w-100" onSubmit={handleSubmit(onSubmit)}>
        <h2>Thông tin người dùng</h2>
        <div className="d-flex w-100 flex-wrap gap-2 gap-md-0">
          <div className="col-12 col-md-6">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Tên người dùng:</Form.Label>
              <Form.Control
                className=""
                type="text"
                placeholder="Tên người dùng"
                {...register("name", { required: true })}
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className=""
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
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
              />
            </Form.Group>
          </div>
          <div className="col-12 col-md-6 my-3">
            <Form.Group className="w-90 mx-auto">
              <Form.Label>Địa chỉ:</Form.Label>
              <Form.Control
                className=""
                type="text"
                placeholder="Địa chỉ"
                {...register("address", { required: false })}
              />
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

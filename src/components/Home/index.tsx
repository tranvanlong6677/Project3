/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from "react-bootstrap";
import ListCars from "../ListCars";

const Home = () => {
  return (
    <Container className="home-wrapper mt-5">
      <h1 className="d-flex justify-content-center">Danh sách xe cho thuê</h1>
      <ListCars />
    </Container>
  );
};
export default Home;

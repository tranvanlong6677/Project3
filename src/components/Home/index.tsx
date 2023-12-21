/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Container } from "react-bootstrap";
import ListCars from "../ListCars";

const Home = () => {
  return (
    <Container className="home-wrapper my-5">
      <h1 className="d-flex justify-content-center">
        <Badge bg="dark" text="light">
          Danh sách xe cho thuê
        </Badge>
      </h1>
      <ListCars />
    </Container>
  );
};
export default Home;

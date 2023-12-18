/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from "react-bootstrap";
import ListCars from "../ListCars";

const Home = () => {
  return (
    <Container className="home-wrapper">
      <ListCars />
    </Container>
  );
};
export default Home;

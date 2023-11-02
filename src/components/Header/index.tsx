import {
  Container,
  DropdownItem,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoCarSportSharp } from "react-icons/io5";
import { routesObj } from "../../utils/routes";
import { authApi } from "../../api/authApi";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    // const access_token: string | null = localStorage.getItem("access_token");
    const refresh_token: string | null = localStorage.getItem("refresh_token");
    // console.log("access_token", access_token);
    console.log("refresh_token", refresh_token);

    if (refresh_token) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await authApi.logout({ refresh_token });
        if (res.message === "Logout successfully") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          toast.success(res.message);
          navigate(routesObj.login);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(">>> error", error);
        toast.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <Navbar expand={"md"} variant="dark" bg="dark" className="header-wrapper">
      <Container className="d-flex ">
        <Link
          to={routesObj.home}
          className="navbar-brand d-flex align-items-center"
        >
          <IoCarSportSharp />
          <span className="mx-2">PROJECT 3</span>
        </Link>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex justify-content-between">
            <div className="d-flex flex-column flex-md-row">
              <Link to={routesObj.home} className="nav-link">
                Home
              </Link>
              <Link to={routesObj.listBookings} className="nav-link">
                List booking
              </Link>
              <Link to={routesObj.createNewCar} className="nav-link">
                Create a new car
              </Link>
            </div>

            <NavDropdown title="My account" id="basic-nav-dropdown">
              <Link to={routesObj.userInformation} className="dropdown-item">
                Information
              </Link>
              <NavDropdown.Divider />
              <DropdownItem
                className="dropdown-item"
                onClick={() => handleLogout()}
              >
                Logout
              </DropdownItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default Header;

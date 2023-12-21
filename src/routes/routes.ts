/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import Home from "../components/Home";
import ListBooking from "../components/ListBooking";
import Login from "../components/Login";
import Register from "../components/Register";
import UserInformation from "../components/UserInformation";
import DefaultLayout from "../layouts/DefaultLayout";
import { routesObj } from "../utils/routes";
import CreateNewCar from "../components/CreateNewCar";
import BookingCar from "../components/BookingCar";
import RentalListings from "../components/RentalListings";
import ListCarsUser from "../components/ListCarsUser";

export const userRoutes: any = [
  {
    path: routesObj.home,
    component: Home,
    layout: DefaultLayout,
  },

  {
    path: routesObj.listBookings,
    component: ListBooking,
    layout: DefaultLayout,
  },
  {
    path: routesObj.userInformation,
    component: UserInformation,
    layout: DefaultLayout,
  },
  {
    path: routesObj.createNewCar,
    component: CreateNewCar,
    layout: DefaultLayout,
  },
  {
    path: routesObj.bookingCar,
    component: BookingCar,
    layout: DefaultLayout,
  },
  {
    path: routesObj.rentalListings,
    component: RentalListings,
    layout: DefaultLayout,
  },
  {
    path: routesObj.listCarsUser,
    component: ListCarsUser,
    layout: DefaultLayout,
  },
];

export const publicRoutes = [
  {
    path: routesObj.login,
    component: Login,
    layout: Fragment,
  },
  {
    path: routesObj.register,
    component: Register,
    layout: Fragment,
  },
];

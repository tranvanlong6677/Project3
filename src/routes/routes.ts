/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import CarInformation from "../components/CarInformation";
import Home from "../components/Home";
import ListBooking from "../components/ListBooking";
import Login from "../components/Login";
import Register from "../components/Register";
import UserInformation from "../components/UserInformation";
import DefaultLayout from "../layouts/DefaultLayout";
import { routesObj } from "../utils/routes";
import CreateNewCar from "../components/CreateNewCar";

export const userRoutes: any = [
  {
    path: routesObj.home,
    component: Home,
    layout: DefaultLayout,
  },
  {
    path: routesObj.carInformation,
    component: CarInformation,
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

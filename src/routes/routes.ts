/* eslint-disable @typescript-eslint/no-explicit-any */
import CarInformation from "../components/CarInformation";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import DefaultLayout from "../layouts/DefaultLayout";
import { routesObj } from "../utils/routes";

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
];

export const publicRoutes = [
  {
    path: routesObj.login,
    component: Login,
    layout: DefaultLayout,
  },
  {
    path: routesObj.register,
    component: Register,
    layout: DefaultLayout,
  },
];

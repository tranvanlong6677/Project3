/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { publicRoutes, userRoutes } from "./routes/routes";
import DefaultLayout from "./layouts/DefaultLayout";
import { Fragment, useEffect } from "react";
import ProtectedRoutes from "./routes/ProtectedRoute";
import CheckPublicRoutes from "./routes/checkPublicRoute";
import { getUserInfoThunk } from "./redux/services/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("access_token");

  const userRoute = userRoutes.map((route: any) => {
    const Page = route.component;
    let Layout: any = DefaultLayout;
    if (route.layout) {
      Layout = route.layout;
    } else if (route.layout === null) {
      Layout = Fragment;
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    );
  });
  const publicRoute = publicRoutes.map((route: any) => {
    const Page = route.component;
    let Layout: any = DefaultLayout;

    if (route.layout) {
      Layout = route.layout;
    } else if (route.layout === undefined) {
      Layout = Fragment;
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    );
  });
  useEffect(() => {
    if (access_token) {
      dispatch(getUserInfoThunk());
    }
  }, [access_token, dispatch]);
  return (
    <>
      {/* <Outlet /> */}

      <Routes>
        <Route element={<CheckPublicRoutes />}>{publicRoute}</Route>
        <Route element={<ProtectedRoutes />}>{userRoute}</Route>
      </Routes>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;

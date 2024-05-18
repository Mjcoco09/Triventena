import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navbar from "./components/Navbar/Navbar";
import ProductHome from "./components/Product/ProductHome";
import ProductDetails from "./components/Product/ProductDetails";
import CartDetails from "./components/Cart/CartDetails";
import Checkout from "./components/Cart/Checkout";
import ThankYou from "./components/Cart/Thankyou";
function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navbar isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProductHome/>
      },
      {
        path: "/product/:id",
        element: <ProductDetails/>,
      },
      {
        path: "/cart",
        element: <CartDetails/>,
      },
      {
        path: "/checkout",
        element: <Checkout/>,
      },
      {
        path: "/thank-you",
        element: <ThankYou/>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;


import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Root from "./root";
import Home from "./pages/home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
    
    </Route>
  )
);

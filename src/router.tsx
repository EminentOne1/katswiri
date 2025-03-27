
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Root from "./root";
import Home from "./pages/home";
import SongPreview from "./components/SongPreview";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/songPreview/:id" element={<SongPreview />} />
    </Route>
  )
);

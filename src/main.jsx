import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainSwiper from "./components/MainSwiper/MainSwiper";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainSwiper />
  </StrictMode>
);

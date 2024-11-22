import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CoverFlowSwiper from "./components/MainSwiper/CoverFlowSwiper";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CoverFlowSwiper />
  </StrictMode>
);



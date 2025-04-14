import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "@/app/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ConfigProvider theme={{ cssVar: true }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);

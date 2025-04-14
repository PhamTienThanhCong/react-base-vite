import { Route, Routes } from "react-router-dom";
import Loading from "./features/loading/Loading";
import NotFoundPage from "./features/errors/NotFoundPage";
import AuthRoute from "./features/auth/authRoute";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AuthRoute />}>
          <Route path="/test" element={<>home</>} />
        </Route>
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
      <Loading />
    </>
  );
}

export default App;

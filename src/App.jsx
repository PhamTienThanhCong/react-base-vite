import { Route, Routes } from "react-router-dom";
import Loading from "./features/loading/Loading";
import NotFoundPage from "./features/errors/NotFoundPage";
import AuthRoute from "./features/auth/authRoute";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
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

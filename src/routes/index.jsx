import { Routes, Route } from "react-router-dom";

// Layout
import { DefaultLayout } from "../layout/DefaultLayout";

// Pages
import { Home } from "../pages/Home";
import { Repository } from "../pages/Repository";
import { NotFound } from "../pages/NotFound";


export function Routers() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/repository/:owner/:repo" element={<Repository />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

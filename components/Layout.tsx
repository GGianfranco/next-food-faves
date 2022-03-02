import type { NextPage } from "next";
import Header from "../components/Header";

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;

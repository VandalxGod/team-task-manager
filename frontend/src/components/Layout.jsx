import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="p-5">{children}</div>
    </div>
  );
};

export default Layout;
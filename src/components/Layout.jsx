import Footer from "./Footer";
import Navbar from "./Navbar";
const Layout = (props) => {
  return (
    <div>
      <Navbar title={props.title} />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
export default Layout;

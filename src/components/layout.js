import Navbar from "./Navbar";
import Footer from "./Footer";
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

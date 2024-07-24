import Navbar from "./navbar";
import Footer from "./footer";
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

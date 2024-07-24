import Footer from "./footer";
import Navbar from "./navbar";
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

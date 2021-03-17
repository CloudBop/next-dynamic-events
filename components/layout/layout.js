import { Fragment } from "react";
import Notification from "../ui/notification";
import MainHeader from "./main-header";

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <Notification title="test" message={"this is a test"} status={error} />
    </Fragment>
  );
}

export default Layout;

import { Fragment, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../ui/notification";
import MainHeader from "./main-header";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const isNoticeActive = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {isNoticeActive && (
        <Notification
          title={isNoticeActive.title}
          message={isNoticeActive.message}
          status={isNoticeActive.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;

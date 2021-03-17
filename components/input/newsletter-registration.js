import { useRef, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";
function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const userEmail = emailInputRef.current.value;
    notificationCtx.showNotification({
      title: "Signing up!",
      message: `Registering email ${userEmail} to newsletter`,
      status: "pending"
    });
    // TODO: validate input
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: userEmail }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        // remember, failed response from the server won't register in te catch block below
        if (res.ok) {
          return res.json();
        }
        // force it to throw error - this will trigger catch() below
        return res.json().then(data => {
          throw new Error(data.message || "something went wrong");
        });
      })
      .then(data => {
        notificationCtx.showNotification({
          title: "Signed up!",
          message: `${userEmail} is registered to newsletter`,
          status: "success"
        });
      })
      .catch(err => {
        notificationCtx.showNotification({
          title: "Failed to sign up!",
          message:
            err.message || `Failed to register ${userEmail} to newsletter`,
          status: "error"
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

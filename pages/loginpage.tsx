import loginpageStyles from "../styles/LoginPage.module.css";
import React, { useRef, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  // createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../init.js";
import Link from "next/link";
import { useRouter } from "next/router";

function Loginpage() {
  const router = useRouter();
  let userEmail:  any = useRef("") ;
  let userPassword: any = useRef("")  ;
  const [, setUser] = useState<object>({});
  const [login, setLoginError] = useState<string>(
    "Please log in with your account."
  );

  async function userLogin(event: any): Promise<void> {
    event.preventDefault();
    console.log(event);

    if (userEmail.current.value === "" || userPassword.current.value === "") {
      setLoginError("Please enter an email and password.");
    } else {
      try {
        await signInWithEmailAndPassword(
          auth,
          userEmail.current.value,
          userPassword.current.value
        );
        router.push("/home");
        setLoginError("user has been logged in");
      } catch (error: string | any) {
        setLoginError("Invalid email or password");
        alert(error.message);
      }
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.push("/home");
      } else {
        router.push("/");
      }
    });
  }, []);

  return (
    <section className={loginpageStyles.loginpage__container}>
      <form onSubmit={(event) => userLogin(event)}>
        <div className={loginpageStyles.loginpage__wrapper}>
          <h1 className={loginpageStyles.loginpage__title}>NETFLIX</h1>
          <h4 className={loginpageStyles.loginpage__subtitle}>{login}</h4>
          <input
            type="email"
            className={loginpageStyles.loginpage__email}
            ref={userEmail}
            required
            placeholder="Email"
          />
          <input
            type="password"
            className={loginpageStyles.loginpage__password}
            ref={userPassword}
            required
            placeholder="Password"
          />

          <Link href="/">
            <button
              className={loginpageStyles.loginpage__button}
              onClick={(event) => userLogin(event)}
            >
              Log in
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Loginpage;

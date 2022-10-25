import { signOut } from "firebase/auth";
import Link from "next/link";
import { auth } from "../init";
import NavbarStyles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  function alertFunction(): void {
    alert("Haven't got the time to implement this feature yet, sorry!");
  }

  function logoutUser(): void {
    signOut(auth);
    router.push("/");
  }

  return (
    <section className={NavbarStyles.movies__container}>
      <nav className={NavbarStyles.navbar__container}>
        <h1 className={NavbarStyles.navbar__title}>NETFLIX</h1>
        <div className={NavbarStyles.navbar__links}>
          <Link href="/home">
            <button className={NavbarStyles.navbar__linkActive}>Home</button>
          </Link>

          <button
            onClick={() => alertFunction()}
            className={NavbarStyles.navbar__link}
          >
            TV Shows
          </button>

          <button
            onClick={() => alertFunction()}
            className={NavbarStyles.navbar__link}
          >
            Latest
          </button>

          <button
            onClick={() => alertFunction()}
            className={NavbarStyles.navbar__link}
          >
            My List
          </button>

          <button
            className={NavbarStyles.logout__button}
            onClick={() => logoutUser()}
          >
            Log Out
          </button>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;

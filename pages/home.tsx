import Movies from "../components/Movies";
import Navbar from "../components/Navbar";

function movies() {
  return (
    <main>
      <Navbar />
      <section>
        <Movies />
      </section>
    </main>
  );
}

export default movies;

import "../styles/Landing.css";

export default function Landing() {
  return (
    <>
      <header>
        <nav className="navigation">
          <button className="logo-button">
            <img
              src="src\assets\Landing\Logo.png"
              alt="Khaijos Logo"
              className="logo-image"
            />
          </button>
        </nav>
      </header>
      <main>
        <div className="top-header">
          <h1>MOVEMENT THAT INSPIRES YOU TO KEEP MOVING</h1>
          <p>JOIN OUR TEAM TODAY OR LOG IN</p>
          <button>LOGIN/REGISTER</button>
        </div>
        <div className="image-carousel"></div>
      </main>
      <footer>Footer</footer>
    </>
  );
}

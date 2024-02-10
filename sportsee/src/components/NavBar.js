import logo from "../images/logo.png";
import meditation from "../images/meditation.svg";
import swimming from "../images/swimming.svg";
import cycling from "../images/cycling.svg";
import fitness from "../images/fitness.svg";

function NavBar() {
	return (
		<>
			{/* Top Navbar */}
			<header>
				<div className="navBar">
					<a href="/" className="logo">
						<img src={logo} alt="Logo de SportSee" />
					</a>
					<a href="/" className="menu">
						Accueil
					</a>
					<a href="/" className="menu">
						Profil
					</a>
					<a href="/" className="menu">
						Réglage
					</a>
					<a href="/" className="menu">
						Communauté
					</a>
				</div>
			</header>

			{/* Left NavBar */}
			<div className="leftNavBar">
				<div className="leftNav">
					<a href="/" className="leftNavIcons">
						<img src={meditation} alt="Meditation icon" />
					</a>
					<a href="/" className="leftNavIcons">
						<img src={swimming} alt="Swimming icon" />
					</a>
					<a href="/" className="leftNavIcons">
						<img src={cycling} alt="Cycling icon" />
					</a>
					<a href="/" className="leftNavIcons">
						<img src={fitness} alt="Fitness icon" />
					</a>
					<p className="copyright">Copyright, SportSee 2020</p>
				</div>
			</div>
		</>
	);
}

export default NavBar;

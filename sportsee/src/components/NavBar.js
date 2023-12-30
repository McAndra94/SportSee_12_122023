import logo from "../logo.png";
import meditation from "../icons/meditation.svg";
import swimming from "../icons/swimming.svg";
import cycling from "../icons/cycling.svg";
import fitness from "../icons/fitness.svg";

function NavBar() {
	return (
		<>
			{/* Top Navbar */}
			<header>
				<div className="navBar">
					<a href="/home" className="logo">
						<img src={logo} alt="Logo de SportSee" />
					</a>
					<a href="/home" className="menu">
						Accueil
					</a>
					<a href="/profile" className="menu">
						Profil
					</a>
					<a href="/setting" className="menu">
						Réglage
					</a>
					<a href="/community" className="menu">
						Communauté
					</a>
				</div>
			</header>

			{/* Left NavBar */}
			<div className="leftNavBar">
				<div className="leftNav">
					<a href="/meditation" className="leftNavIcons">
						<img src={meditation} alt="Meditation icon" />
					</a>
					<a href="/swimming" className="leftNavIcons">
						<img src={swimming} alt="Swimming icon" />
					</a>
					<a href="/cycling" className="leftNavIcons">
						<img src={cycling} alt="Cycling icon" />
					</a>
					<a href="/fitness" className="leftNavIcons">
						<img src={fitness} alt="Fitness icon" />
					</a>
					<p className="copyright">Copyright, SportSee 2020</p>
				</div>
			</div>
		</>
	);
}

export default NavBar;

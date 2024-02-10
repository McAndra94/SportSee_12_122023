import caloriesIcon from "../images/calories.svg";
import proteinIcon from "../images/proteins.svg";
import glucideIcon from "../images/glucides.svg";
import lipidIcon from "../images/lipides.svg";

const UserTrack = ({ userData }) => {
	const calorieCount = userData?.data?.keyData?.calorieCount;
	const proteinCount = userData?.data?.keyData?.proteinCount;
	const carbohydrateCount = userData?.data?.keyData?.carbohydrateCount;
	const lipidCount = userData?.data?.keyData?.lipidCount;

	return (
		<aside>
			<div className="trackBox">
				<div className="calorieIcon trackIcon">
					<img src={caloriesIcon} alt="Calories icon" />
				</div>
				<div>
					<p className="trackAmount">{`${calorieCount}kCal`}</p>
					<p className="trackName">Calories</p>
				</div>
			</div>
			<div className="trackBox">
				<div className="proteinIcon trackIcon">
					<img src={proteinIcon} alt="Protein icon" />
				</div>
				<div>
					<p className="trackAmount">{`${proteinCount}g`}</p>
					<p className="trackName">Proteines</p>
				</div>
			</div>
			<div className="trackBox">
				<div className="glucideIcon trackIcon">
					<img src={glucideIcon} alt="Glucides icon" />
				</div>
				<div>
					<p className="trackAmount">{`${carbohydrateCount}g`}</p>
					<p className="trackName">Glucides</p>
				</div>
			</div>
			<div className="trackBox">
				<div className="lipidIcon trackIcon">
					<img src={lipidIcon} alt="Lipides icon" />
				</div>
				<div>
					<p className="trackAmount">{`${lipidCount}g`}</p>
					<p className="trackName">Lipides</p>
				</div>
			</div>
		</aside>
	);
};

export default UserTrack;

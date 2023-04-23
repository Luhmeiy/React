import { photoData } from "../../interfaces/initialStateData";
import styles from "./LikeContainer.module.scss";

import { BsHeart, BsHeartFill } from "react-icons/bs";

interface LikeContainerProps {
	photo: photoData;
	user: any;
	handleLike: (photo: photoData) => void;
}

const LikeContainer = ({ photo, user, handleLike }: LikeContainerProps) => {
	return (
		<div className={styles.like}>
			{photo.likes && user && (
				<>
					{photo.likes.includes(user._id) ? (
						<BsHeartFill />
					) : (
						<BsHeart onClick={() => handleLike(photo)} />
					)}

					<p>{photo.likes.length} like(s)</p>
				</>
			)}
		</div>
	);
};

export default LikeContainer;

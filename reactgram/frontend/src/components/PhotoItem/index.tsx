import styles from "./PhotoItem.module.scss";
import { photoData } from "../../interfaces/initialStateData";

import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";

const PhotoItem = ({ photo }: { photo: photoData }) => {
	return (
		<div className={styles["photo-item"]}>
			{photo.image && (
				<img
					src={`${uploads}/photos/${photo.image}`}
					alt={photo.title}
				/>
			)}

			<h2>{photo.title}</h2>
			<p className={styles["photo-author"]}>
				Publicada por:{" "}
				<Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
			</p>
		</div>
	);
};

export default PhotoItem;

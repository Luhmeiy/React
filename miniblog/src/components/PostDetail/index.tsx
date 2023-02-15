// libraries
import { Link } from "react-router-dom";

// styles
import styles from "./PostDetail.module.scss";

interface PostProps {
	id: string;
	title: string;
	createdBy: string;
	image: string;
	tagsArray: string[];
	body: string;
}

const PostDetail = ({ post }: { post: PostProps }) => {
	return (
		<div className={styles.post_detail}>
			<img src={post.image} alt={post.title} />
			<h2>{post.title}</h2>
			<p className={styles.createdBy}>{post.createdBy}</p>

			<div className={styles.tags}>
				{post.tagsArray.map((tag: string) => (
					<p key={tag}>
						<span>#</span>
						{tag}
					</p>
				))}
			</div>

			<Link to={`/posts/${post.id}`} className="btn btn-outline">
				Ler
			</Link>
		</div>
	);
};

export default PostDetail;

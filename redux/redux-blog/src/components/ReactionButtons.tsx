import { useDispatch } from "react-redux";
import { Post, reactionAdded, Reactions } from "@/features/posts/postsSlice";

const reactionEmoji: Record<Reactions, string> = {
	thumbsUp: "👍",
	wow: "😮",
	heart: "❤️",
	rocket: "🚀",
	coffee: "☕",
};

const ReactionButtons = ({ post }: { post: Post }) => {
	const dispatch = useDispatch();

	return (
		<div>
			{(Object.entries(reactionEmoji) as [Reactions, string][]).map(
				([name, emoji]) => {
					return (
						<button
							key={name}
							type="button"
							className="reactionButton"
							onClick={() =>
								dispatch(
									reactionAdded({
										postId: post.id,
										reaction: name,
									})
								)
							}
						>
							{emoji} {post.reactions[name]}
						</button>
					);
				}
			)}
		</div>
	);
};
export default ReactionButtons;

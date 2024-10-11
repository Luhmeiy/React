import {
	Post,
	Reactions,
	useAddReactionMutation,
} from "@/features/posts/postsSlice";

const reactionEmoji: Record<Reactions, string> = {
	thumbsUp: "👍",
	wow: "😮",
	heart: "❤️",
	rocket: "🚀",
	coffee: "☕",
};

const ReactionButtons = ({ post }: { post: Post }) => {
	const [addReaction] = useAddReactionMutation();

	return (
		<div>
			{(Object.entries(reactionEmoji) as [Reactions, string][]).map(
				([name, emoji]) => {
					return (
						<button
							key={name}
							type="button"
							className="reactionButton"
							onClick={() => {
								const newValue = post.reactions[name] + 1;
								addReaction({
									postId: post.id,
									reactions: {
										...post.reactions,
										[name]: newValue,
									},
								});
							}}
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

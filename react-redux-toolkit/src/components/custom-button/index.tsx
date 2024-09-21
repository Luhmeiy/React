import { ReactNode } from "react";
import * as Styles from "./styles";

const CustomButton = ({
	children,
	startIcon,
	onClick,
	...rest
}: {
	children: ReactNode;
	startIcon: ReactNode;
	onClick: () => void;
}) => {
	return (
		<Styles.CustomButtonContainer {...rest} onClick={onClick}>
			{startIcon && (
				<Styles.IconContainer>{startIcon}</Styles.IconContainer>
			)}

			{children}
		</Styles.CustomButtonContainer>
	);
};

export default CustomButton;

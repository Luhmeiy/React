import { ReactNode } from "react";
import * as Styles from "./styles";

const CustomButton = ({
	children,
	startIcon,
	...rest
}: {
	children: ReactNode;
	startIcon: ReactNode;
}) => {
	return (
		<Styles.CustomButtonContainer {...rest}>
			{startIcon && (
				<Styles.IconContainer>{startIcon}</Styles.IconContainer>
			)}

			{children}
		</Styles.CustomButtonContainer>
	);
};

export default CustomButton;

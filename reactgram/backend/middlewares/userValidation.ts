export const registerValidation = {
	body: {
		type: "object",
		properties: {
			name: {
				type: "string",
				minLength: 3,
				errorMessage: {
					minLength: "O nome precisa ter no mínimo 3 caracteres.",
				},
			},
			email: {
				type: "string",
			},
			password: {
				type: "string",
				minLength: 5,
				errorMessage: {
					minLength: "A senha precisa ter no mínimo 5 caracteres.",
				},
			},
			confirmPassword: {
				type: "string",
				minLength: 5,
				errorMessage: {
					minLength: "A senha precisa ter no mínimo 5 caracteres.",
				},
			},
		},
		required: ["name", "email", "password", "confirmPassword"],
		errorMessage: {
			required: {
				name: "O nome é obrigatório.",
				email: "O email é obrigatório.",
				password: "A senha é obrigatória.",
				confirmPassword: "A confirmação de senha é obrigatória.",
			},
		},
	},
};

export const loginValidation = {
	body: {
		type: "object",
		properties: {
			email: {
				type: "string",
			},
			password: {
				type: "string",
			},
		},
		required: ["email", "password"],
		errorMessage: {
			required: {
				email: "O email é obrigatório.",
				password: "A senha é obrigatória.",
			},
		},
	},
};

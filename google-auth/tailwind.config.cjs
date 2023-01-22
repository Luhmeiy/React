/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.tsx',
		'./index.html'
	],
	theme: {
		extend: {
			colors: {
				background: '#121214',
				primary: '#00B37E',
				caption: '#8D8D99',
				gray: '#E1E1E6'
			},
			fontFamily: {
				'poppins': ['"Poppins"', 'sans-serif'],
			},
		},
	},
	plugins: [],
}

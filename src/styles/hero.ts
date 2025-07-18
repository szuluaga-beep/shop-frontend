import { heroui } from "@heroui/react";
export default heroui({
    addCommonColors: true,
    themes: {
        dark: {
			colors: {
				primary: {
					DEFAULT: "#FAE122",
					foreground: "#000000",
				},
				background: {
					DEFAULT: "#1E1E1E",
					foreground: "#ffffff",
				},
				success: {
					DEFAULT: "#00C648",
					foreground: "#ffffff",
				},
				secondary: {
					DEFAULT: "#2388FF",
					foreground: "#ffffff",
				},
				warning: {
					DEFAULT: "#FFB800",
					foreground: "#000000",
				},
				danger: {
					DEFAULT: "#DD2D46",
					foreground: "#ffffff",
				},
				
			},
		},
    }
});
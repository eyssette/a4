import globals from "globals";
import pluginJs from "@eslint/js";

export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	{
		rules: {
			semi: ["error", "always"],
			quotes: ["error", "double", { avoidEscape: true }],
			"no-multi-spaces": ["error"],
			"no-trailing-spaces": ["error"],
			"comma-spacing": ["error"],
			"array-bracket-spacing": ["error"],
			"object-curly-spacing": ["error", "always"],
			"space-infix-ops": ["error"],
			camelcase: ["error"],
			"key-spacing": ["error"],
			"no-duplicate-imports": ["error"],
			"padded-blocks": ["error", "never"],
			"space-before-blocks": ["error"],
			"no-irregular-whitespace": [
				"error",
				{ skipStrings: true, skipTemplates: true },
			],
		},
	},
];

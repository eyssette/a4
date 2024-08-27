import terser from "@rollup/plugin-terser";
import { string } from "rollup-plugin-string";
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";
//import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
	input: "js/main.js",
	output: {
		file: "script.min.js",
		format: "iife",
		plugins: [terser()],
		sourcemap: true,
	},
	plugins: [
		//nodeResolve(),
		string({
			include: "**/*.min.css",
		}),
		postcss({
			extensions: [".css"],
			include: ["css/styles.css"],
			extract: "css/styles.min.css",
			minimize: true,
			plugins: [
				cssnano({
					preset: "default",
				}),
			],
		}),
		postcss({
			extensions: [".css"],
			include: ["css/templateA4.css"],
			extract: "css/templateA4.min.css",
			minimize: true,
			plugins: [
				cssnano({
					preset: "default",
				}),
			],
		}),
	],
};

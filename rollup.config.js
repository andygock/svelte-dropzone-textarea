import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.js",
  output: [{ file: "dist/index.js", format: "umd", name: "DropzoneTextArea" }],
  plugins: [svelte(), postcss(), resolve()],
};

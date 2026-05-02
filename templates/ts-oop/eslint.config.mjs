import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import path from "node:path";

export default defineConfig([

  // =========================
  // TYPESCRIPT (TYPE-AWARE)
  // =========================
  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: path.resolve(),
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: globals.browser,
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },

    rules: {
      ...tseslint.configs.recommendedTypeChecked.rules,

      // Your custom rules
      semi: ["error", "always"],
      eqeqeq: ["error", "always"],
      "@typescript-eslint/no-unused-vars": "warn",
      indent: ["error", 2],
      "no-debugger": "warn",
      "prefer-const": "error",
    },
  },

  // =========================
  // JAVASCRIPT
  // =========================
  {
    files: ["**/*.{js,mjs,cjs}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    plugins: {
      "@eslint/js": js,
    },

    rules: {
      ...js.configs.recommended.rules,

      semi: ["error", "always"],
      eqeqeq: ["error", "always"],
      "no-unused-vars": "warn",
      indent: ["error", 2],
      "no-debugger": "warn",
      "prefer-const": "error",
      "no-undef": "error",
    },
  },
]);
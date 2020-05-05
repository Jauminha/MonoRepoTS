module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json", "./tools/tsconfig.json", "./src/**/*/tsconfig.json"],
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    rules: {
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/prefer-regexp-exec": "off",

        "@typescript-eslint/quotes": ["error", "double", {"allowTemplateLiterals": true}],

        "eqeqeq": ["error", "smart"],
        "id-blacklist": [
            "error",
            "any",
            "Number",
            "number",
            "String",
            "string",
            "Boolean",
            "boolean",
            "Undefined",
            "undefined"
        ],
        "id-match": "error",
        "no-eval": "error",
        "no-redeclare": "error",
        "no-trailing-spaces": "error",
        "no-underscore-dangle": "error",
        "no-unsafe-finally": "error",
        "spaced-comment": "error",
    },
    overrides: [
        {
            "files": ["./tools/**/*"],
            "rules": {
                "@typescript-eslint/explicit-function-return-type": "off"
            },
        }
    ]
};

module.exports = {
    parser: "babel-eslint",
    extends: ["airbnb", "eslint:recommended", "airbnb/hooks"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        },
    },
    rules: {
        "import/no-cycle": "off",
        "no-console": ["error", { "allow": ["warn", "error"] }],
        "import/prefer-default-export": "off",
        "react/prop-types": "off",
        "import/no-extraneous-dependencies": "off",
        "max-len": ["error", {"code": 160}],
        "class-methods-use-this": "off",
        "react/destructuring-assignment": "off",
        "no-shadow": "off",
        "react/jsx-fragments": [2, "element"],
        "object-curly-newline": ["error", {
            "ImportDeclaration": "never",
            "ExportDeclaration": { "multiline": true, "minProperties": 3 }
        }],
        "max-classes-per-file": "off"
    },
    settings: {
        "import/resolver": {
            "webpack": {
                "config": "webpack/webpack.config.dev.js"
            }
        }
    }
};

module.exports = {
    // FIXME: this should link to project-base in v2
    "extends": [
        "eslint:recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "plugins": [],
    "rules": {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "comma-dangle": ["error", "never"],
        "func-call-spacing": ["error", "never"],
        "no-trailing-spaces": "error"
    }
};
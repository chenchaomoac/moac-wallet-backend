module.exports = {
    root: true,
    // extends: '@react-native-community',
    /*
     * 通用规则
     *
     * 安装依赖：
     * npm install --save-dev eslint babel-eslint eslint-config-alloy
     * 或：
     * yarn add --dev eslint babel-eslint eslint-config-alloy
     */
    extends: ["alloy"],

    /*
     * Vue 专用规则
     *
     * 安装依赖：
     * npm install --save-dev eslint babel-eslint vue-eslint-parser@5.0.0 eslint-plugin-vue eslint-config-alloy
     * 或：
     * yarn add --dev eslint babel-eslint vue-eslint-parser@5.0.0 eslint-plugin-vue eslint-config-alloy
     */
    // extends: ["alloy", "alloy/vue"],

    /*
     * React 专用规则
     *
     * 安装依赖：
     * npm install --save-dev eslint babel-eslint eslint-plugin-react eslint-config-alloy
     * 或：
     * yarn add --dev eslint babel-eslint eslint-plugin-react eslint-config-alloy
     */
    // extends: ["alloy", "alloy/react"],

    /*
     * TypeScript 专用规则
     *
     * 安装依赖：
     * npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy
     * 或：
     * yarn add --dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy
     */
    // extends: ["alloy", "alloy/typescript"],

    /*
     * TypeScript React 专用规则
     *
     * 安装依赖：
     * npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-alloy
     * 或：
     * yarn add --dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-alloy
     */
    // extends: ["alloy", "alloy/react", "alloy/typescript"],

    globals: {},
    rules: {
        // "sort-imports": [
        //     "error",
        //     {
        //         ignoreMemberSort: false,
        //         ignoreDeclarationSort: true,
        //         ignoreCase: false,
        //         memberSyntaxSortOrder: ["none", "all", "single", "multiple"],
        //     },
        // ],
        // "arrow-parens": ["error", "as-needed"],
        // "arrow-body-style": ["error", "as-needed"],
        // "prefer-promise-reject-errors": "off",
        // "react/jsx-no-useless-fragment": "off",
        // "@typescript-eslint/explicit-member-accessibility": "off",
        // "@typescript-eslint/no-require-imports": "off",
        // "no-unused-expressions": "off",
        // "@typescript-eslint/no-unused-expressions": "error",
        // "max-params": ["error", { max: 5 }],
    },
};

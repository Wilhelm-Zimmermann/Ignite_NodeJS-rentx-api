module.exports = {
    presets: [
        ["@babel/prest-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@modules": ["./src/modules"],
                    "@config": ["./src/config"],
                    "@shared": ["./src/shared"],
                    "@errors": ["./src/errors"],
                }
            }
        ],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ]
}
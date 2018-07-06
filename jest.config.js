module.exports = {
    coverageDirectory: "./app",
    moduleDirectories: ["node_modules"],
    moduleNameMapper: {
        "^DinDin(.*)$": "<rootDir>/",
        "^Components(.*)$": "<rootDir>/Components"
    },
    rootDir: "./app",
    transform: {
        "^.+\\.js$": "babel-jest"
    }
};
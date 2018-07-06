module.exports = {
    coverageDirectory: "./app",
    moduleDirectories: ["node_modules"],
    rootDir: "./app",
    transform: {
        "^.+\\.js$": "babel-jest"
    }
};
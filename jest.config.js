module.exports = {
    coverageDirectory: "./app",
    moduleDirectories: ["node_modules"],
    moduleNameMapper: {
        "^DinDin(.*)$": "<rootDir>/",
        "^Components(.*)$": "<rootDir>/Components",
        "^.+\\.(css|scss)$": "identity-obj-proxy"
    },
    rootDir: "./app",
    setupFiles: ["./jestsetup.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    transform: {
        "^.+\\.js$": "babel-jest"
    }
};
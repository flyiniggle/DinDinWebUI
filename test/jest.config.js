const path = require('path');

module.exports = {
    coverageDirectory: path.join('<rootDir>', 'test', 'coverage'),
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '^Business(.*)$': path.join('<rootDir>', 'app', 'Business', '$1'),
        '^DinDin(.*)$': path.join('<rootDir>', 'app', '$1'),
        '^Components(.*)$': path.join('<rootDir>', 'app', 'Components', '$1'),
        '^UI(.*)$': path.join('<rootDir>', 'app', 'UI', '$1'),
        '^.+\\.(css|scss|sass)$': 'identity-obj-proxy'
    },
    rootDir: '../',
    roots: ['<rootDir>/app'],
    setupFiles: [path.join('<rootDir>', 'test', 'jestsetup.js')],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    transform: {
        '^.+\\.js$': 'babel-jest'
    }
};
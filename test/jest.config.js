const path = require('path');

module.exports = {
    coverageDirectory: path.join('<rootDir>', 'test', 'coverage'),
    globals: {
        __APIRoot__: 'test'
    },
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '^.+\\.(css|scss|sass)$': path.join('<rootDir>', 'test', 'mocks', 'styles.js'),
        '^Business(.*)$': path.join('<rootDir>', 'app', 'Business', '$1'),
        '^DinDin(.*)$': path.join('<rootDir>', 'app', '$1'),
        '^Components(.*)$': path.join('<rootDir>', 'app', 'Components', '$1'),
        '^UI(.*)$': path.join('<rootDir>', 'app', 'UI', '$1'),
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.join('<rootDir>', 'test', 'mocks', 'files.js')
    },
    rootDir: '../',
    roots: ['<rootDir>/app'],
    setupFiles: [path.join('<rootDir>', 'test', 'jestsetup.js'), 'jest-localstorage-mock'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    transform: {
        '^.+\\.js$': 'babel-jest'
    }
};

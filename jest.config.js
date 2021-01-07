module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testMatch: ["<rootDir>/src/**/_tests_/*.spec.ts"],
    moduleFileExtensions: ["ts", "js", "json", "node"],
    testEnvironment: "node",
    collectCoverage: false,
    globals: {
        "ts-jest": {
            diagnostics: true
        }
    },
    verbose: true
};

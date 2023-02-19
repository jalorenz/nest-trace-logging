module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.[tj]s$": [
            "ts-jest",
            {
                tsconfig: "<rootDir>/tsconfig.json",
            },
        ],
    },
    collectCoverage: true,
    setupFilesAfterEnv: ["jest-sinon"],
    coverageReporters: ["lcov", "text", "text-summary"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 85,
            lines: 85,
            statements: 85,
        },
    },
}
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
    testMatch: ["<rootDir>/lib/**/*.spec.ts"],
    collectCoverage: true,
    setupFilesAfterEnv: ["jest-sinon"],
    coverageReporters: ["lcov", "text", "text-summary"],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 80,
            lines: 85,
            statements: 85,
        },
    },
}
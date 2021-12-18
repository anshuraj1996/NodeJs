const { getNameFromCommandLine, getNameFromEnv } = require("../assignments/assignment_1");

describe('assignment_1', () => {
    const OLD_ARGV = process.argv;
    const OLD_ENV = process.env;

    beforeAll(() => {
        jest.resetModules() // Most important - it clears the cache
        process.argv = [ ...OLD_ARGV, "Yash" ]; // Make a copy
        process.env.name = "Yash";
    });
    
    afterAll(() => {
        process.argv = OLD_ARGV; // Restore old environment
        process.env = OLD_ENV;
    });

    test('Get name from command line', () => {
        expect(getNameFromCommandLine()).toEqual('Yash');
    });

    test('Get name from command line', () => {
        expect(getNameFromEnv()).toEqual('Yash');
    });
})
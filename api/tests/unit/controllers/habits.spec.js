const habitsController = require('../../../controllers/habits')
const Habit = require('../../../models/habits');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('habit controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns dogs with a 200 status code', async () => {
            let testDogs = ['d1', 'd2']
            jest.spyOn(Dog, 'all', 'get')
                 .mockResolvedValue(testDogs);
            await dogsController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testDogs);
        })
    });
})

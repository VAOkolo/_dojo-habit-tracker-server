const Habit = require('../../../models/Habits');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Owner', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('dogs', () => {
        test('it resolves with dogs on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ 
                    rows: [{id: 1, name: 'd1'}, {id: 2, name: 'd2'}]
                });
            let testOwner = new Owner({ id: 1, name: 'Test Owner'})
            const dogs = await testOwner.dogs;
            expect(dogs).toHaveLength(2)
        })
    });
})

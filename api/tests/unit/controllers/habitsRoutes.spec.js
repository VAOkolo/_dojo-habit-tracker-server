describe('auth endpoints', () => {
    let api;
    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('should render the home page', async () => {
        const res = await request(api).get('/');
        expect(res.statusCode).toEqual(200);
    })
    
    it('should return the data as an object', async () => {
        const res = await request(api).get('/habits');
        expect(res.statusCode).toEqual(200);
    })
})

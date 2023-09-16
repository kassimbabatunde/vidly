const request = require('supertest');
let server;
describe('api/genres', () =>{
    beforeEach(() => { server = require('../../index');});
    afterEach(async () => {server.close();});
    
    describe('GET /', () =>{
        it('should return all genres in db', async () => {
            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200);
        });
    });
    
});
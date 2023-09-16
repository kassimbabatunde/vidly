const request = require('supertest');
const { Rental } = require('../../models/rentals');
const { default: mongoose } = require('mongoose');
let server;
describe('api/returns', () =>{
    let customerId;
    let movieId;
    let rental;
    let server;

    beforeEach(async () => { 
        server = require('../../index');
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        rental = Rental({
            customer: {
                _id: customerId,
                name: 'tunde',
                phone: '12345'
                
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }   
        });
        await rental.save();
    });

    afterEach(async () => { 
        await server.close();
        await Rental.remove({});
    });


    
    describe('Return 401 if Unatuhhroised /', () =>{
        it('should return all genres in db', async () => {
            const res = await request(server).get('/api/returns')
            expect(res.status).toBe(401);
        });
    });
    
});
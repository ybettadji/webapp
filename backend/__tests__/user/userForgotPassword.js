import supertest from 'supertest'
import mongoose from "mongoose";
import User from '../../app/externalServices/databases/mongodb/models/User.js'
import {app} from "../utils/app.js"

const validEmail = 'testspamwebapp1234@gmail.com'
const validEmail2 = 'testspamwebapp12345@gmail.com'
const invalidEmail = "testspamwebapp1234gmail.com"
const validPassword = 'Awgui6&%t'
const invalidPassword = '12345'
const emailNotRegisteredInDB = 'bfeuidhdewsccdfnjisck@gmail.com'

let userInactive1 = new User({email: "user1jewiofji@gmail.com", password: '123456789', status: 'inactive', role: 'member'})
let userInactive2 = new User({email: "user2jewiofji@gmail.com", password: '123456789', status: 'inactive', role: 'member'})
let userActive3 = new User({email: "user3jewiofji@gmail.com", password: '123456789', status: 'active', role: 'member'})
let userInactive4 = new User({email: "user4jewiofji@gmail.com", password: '123456789', status: 'inactive', role: 'member'})

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/test2")
    userInactive1 = await userInactive1.save()
    userInactive2 = await userInactive2.save()
    userActive3 = await userActive3.save()
    userInactive4 = await userInactive4.save()
})

afterAll(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
})

describe('User', () => {


    describe('GET /user/forgot-password', () => {

        describe('Known email', () => {
            it('should return a 200 status', (done) => {
                supertest(app)
                .post('/user/forgot-password')
                .send({email: userInactive1.email})
                .then((response) => {
                    expect(response.statusCode).toEqual(200)
                    expect(response.body.message).toEqual("An email has been sent")
                    done()
                })
            })
        })
        
        describe('unknown email', () => {
            it('should return a 200 status but the email is not sent', (done) => {
                supertest(app)
                .post('/user/forgot-password')
                .send({email: emailNotRegisteredInDB})
                .then((response) => {
                    expect(response.statusCode).toEqual(200)
                    expect(response.body.message).toEqual("An email has been sent")
                    done()
                })
            })
        ;})

    })

})


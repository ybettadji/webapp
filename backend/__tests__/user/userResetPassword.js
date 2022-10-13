import supertest from 'supertest'
import mongoose from "mongoose";
import User from '../../app/externalServices/databases/mongodb/models/User.js'
import {app} from "../utils/app.js"
import tokenService from '../../app/services/tokenService.js';
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
    await mongoose.connect("mongodb://localhost:27017/test1")
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

    describe('GET /user/reset-password', () => {

        describe('Known email with good token', () => {
            it('should change the password of userActive3 and return a 200 status', (done) => {
                supertest(app)
                .post('/user/reset-password/' + tokenService.createResetPasswordToken(userActive3))
                .send({password: validPassword})
                .then((response) => {
                    expect(response.statusCode).toEqual(200)

                    done()
                })
            })
            
        })

        describe('Known email with good token but invalidPassword', () => {
            it('should return a 400 status', (done) => {
                supertest(app)
                .post('/user/reset-password/' + tokenService.createResetPasswordToken(userInactive2))
                .send({password: invalidPassword})
                .then((response) => {
                    expect(response.statusCode).toEqual(400)
                    done()
                })
            })
            
        })
        
        describe('with a wrong token', () => {
            it('should return a 401 status', (done) => {
                supertest(app)
                .post('/user/reset-password/' + 'ioehdws879wyedhasijlkjl')
                .send({password: validPassword})
                .then((response) => {
                    expect(response.statusCode).toEqual(401)
                    done()
                })
            })
        })


    })


})


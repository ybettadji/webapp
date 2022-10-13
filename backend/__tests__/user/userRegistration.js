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
        await mongoose.connect("mongodb://localhost:27017/test3")
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

    

    describe('POST /user/registration', () => {
        describe('register a valid user', () => {
            it('should return a 201 status code and the message "The user has been created" ',  (done) => {
                supertest(app)
                    .post('/user/registration')
                    .send({email: 'younes.bettadji@gmail.com', password: validPassword})
                    .then((response) => {
                        expect(response.statusCode).toEqual(201);
                        expect(response.body.message).toEqual("The user has been created")
                        done()
                    })
            })
        })

        describe('register a user already registred', () => {
            it('should return a 400 status code and the message "The user already exists"',  (done) => {
                supertest(app)
                    .post('/user/registration')
                    .send({email: userInactive2.email, password: validPassword})
                    .then((response) => {
                        expect(response.statusCode).toEqual(400);
                        expect(response.body).toEqual("The user already exists")
                        done()
                    })
            })
        })

        describe('register a user with a wrong email format', () => {
            it('should return a 400 status code and the message "Invalid Email" ',  (done) => {
                supertest(app)
                    .post('/user/registration')
                    .send({email: invalidEmail, password: validPassword})
                    .then((response) => {
                        expect(response.statusCode).toEqual(400);
                        expect(response.body).toEqual("Invalid Email")
                        done()
                    })
            })
        })

        describe('register a user with a wrong password ', () => {
            it('should return a 400 status code and the message "Invalid Password" ',  (done) => {
                supertest(app)
                    .post('/user/registration')
                    .send({email: validEmail, password: invalidPassword})
                    .then((response) => {
                        expect(response.statusCode).toEqual(400);
                        expect(response.body).toEqual("Invalid Password")
                        done()
                    })
            })
        })

        describe('register a user with a wrong "email" property name', () => {
            it('should return a 400 status code and the message "Invalid User" ',  (done) => {
                supertest(app)
                    .post('/user/registration')
                    .send({wrongEmailProperty: validEmail, password: validPassword})
                    .then((response) => {
                        expect(response.statusCode).toEqual(400);
                        expect(response.body).toEqual("Invalid User")
                        done()
                    })
            })
        })

        describe('register a user with without "password" property', () => {
            it('should return a 400 status code and the message "Invalid User"',  (done) => {
                supertest(app)
                    .post('/user/registration')
                    .send({email: validEmail})
                    .then((response) => {
                        expect(response.statusCode).toEqual(400);
                        expect(response.body).toEqual("Invalid User")
                        done()
                    })
            })
        })

        describe('register a Valid user with a third property', () => {
            it('should return a 201 status code and the message "The user has been created" ',  (done) => {
                supertest(app)
                    .post('/user/registration')
                    .send({email: validEmail2, password: validPassword, thirdproperty: true})
                    .then((response) => {
                        expect(response.statusCode).toEqual(201);
                        expect(response.body.message).toEqual("The user has been created")
                        done()
                    })
            })
        })

        describe('check if a user with the email: validEmail2 has been registered ', () => {
            it('should return a valid a user with a crypted password and the email: validEmail2" ',  async () => {
                const userFound = await User.findOne({email: validEmail2})
                expect(userFound).toBeTruthy()
                expect(userFound._id).toBeTruthy()
                expect(userFound.email).toEqual(validEmail2)
                expect(userFound.password.length).toBeGreaterThan(50)
                expect(userFound.status).toEqual("inactive")
                expect(userFound.role).toEqual("member")
            })
        })
        
        // test email
    })

    describe('PUT /user/registration/confirmation', () => {
        
        describe('User Activation with a good id', () => {
            it('should return a 200 status code and the message "The user has been updated" ',  (done) => {
                supertest(app)
                    .put('/user/registration/confirmation/' + tokenService.createRegistrationConfirmationToken(userInactive2))
                    .then((response) => {
                        expect(response.statusCode).toEqual(200);
                        expect(response.body.message).toEqual("The user has been updated")
                        done()
                    })
            })
        })

        describe('User Activation of a user already activated', () => {
            it('should return a 400 status code and the message "The user is already activated" ',  (done) => {
                supertest(app)
                    .put('/user/registration/confirmation/' + tokenService.createRegistrationConfirmationToken(userActive3))
                    .then((response) => {
                        expect(response.statusCode).toEqual(400);
                        expect(response.body).toEqual("The user is already activated")
                        done()
                    })
            })
        })

        describe('User Activation with a wrong id', () => {
            it('should return a 401 status code',  (done) => {
                supertest(app)
                    .put('/user/registration/confirmation/' + '78978789703')
                    .then((response) => {
                        expect(response.statusCode).toEqual(401);
                        done()
                    })
            })
        })

        describe('check if the userInactive2 is now activated', () => {
            it('should return the userInactive2 with the status active', async () => {
                const user2 = await User.findById(userInactive2._id)
                expect(user2.status).toEqual('active')
            })
        })
   })
})


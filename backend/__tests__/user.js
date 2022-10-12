import supertest from 'supertest'
import mongoose from "mongoose";
import User from '../app/externalServices/databases/mongodb/models/User.js'
import app from "./utils/app.js"
import emailService from '../app/services/emailService.js';
import tokenService from '../app/services/tokenService.js';

const validEmail = 'testspamwebapp1234@gmail.com'
const validEmail2 = 'testspamwebapp12345@gmail.com'
const invalidEmail = "testspamwebapp1234gmail.com"
const validPassword = 'Awgui6&%t'
const invalidPassword = '12345'

let user1 = new User({email: "user1jewiofji@gmail.com", password: '123456789', status: 'inactive', role: 'member'})
let user2 = new User({email: "user2jewiofji@gmail.com", password: '123456789', status: 'inactive', role: 'member'})
let user3 = new User({email: "user3jewiofji@gmail.com", password: '123456789', status: 'inactive', role: 'member'})
let user4 = new User({email: "user4jewiofji@gmail.com", password: '123456789', status: 'inactive', role: 'member'})

describe('User', () => {

    beforeAll(async () => {
        user1 = await user1.save()
        user2 = await user2.save()
        user3 = await user3.save()
        user4 = await user4.save()
    })

    afterAll(async () => {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
          await collection.deleteMany({});
        }
    });

    describe('POST /user/registration', () => {
        describe('register a valid user', () => {
            it('should return a 201 status code and the message "The user has been created" ',  (done) => {
                supertest(app)
                    .post('/user/registration')
                    .send({email: validEmail, password: validPassword})
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
                    .send({email: validEmail, password: validPassword})
                    .then((response) => {
                        console.log(response.body);
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
            it('should return a 400 status code and the message "Invalid Email" ',  (done) => {
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
            it('should return a 400 status code and the message "Invalid Email"',  (done) => {
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
                    .put('/user/registration/confirmation/' + tokenService.createRegistrationToken(user3))
                    .then((response) => {
                        expect(response.statusCode).toEqual(200);
                        expect(response.body.message).toEqual("The user has been updated")
                        done()
                    })
            })
        })

        describe('User Activation of a user already activated', () => {
            it('should return a 200 status code and the message "The user has been updated" ',  (done) => {
                supertest(app)
                    .put('/user/registration/confirmation/' + tokenService.createRegistrationToken(user3))
                    .then((response) => {
                        expect(response.statusCode).toEqual(400);
                        expect(response.body).toEqual("The user is already activated")
                        done()
                    })
            })
        })

        describe('User Activation with a wrong id', () => {
            it('should return a 400 status code and the message "The user does not exist" ',  (done) => {
                supertest(app)
                    .put('/user/registration/confirmation/' + '78978789703')
                    .then((response) => {
                        expect(response.statusCode).toEqual(401);
                      //  expect(response.body.error).toEqual("The user does not exist")
                        done()
                    })
            })
        })

        

        describe('check if the user3 is activated', () => {
            it('should return the user3 with the status active', async () => {
                user3 = await User.findById(user3._id)
                expect(user3.status).toEqual('active')
            })
        })

        


    })


})
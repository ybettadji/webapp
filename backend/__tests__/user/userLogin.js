import supertest from 'supertest'
import mongoose from "mongoose";
import User from '../../app/externalServices/databases/mongodb/models/User.js'
import {app} from "../utils/app.js"
import bcrypt from 'bcrypt'

const validEmail = 'testspamwebapp1234@gmail.com'
const validEmail2 = 'testspamwebapp12345@gmail.com'
const invalidEmail = "testspamwebapp1234gmail.com"
const validPassword = 'Awgui6&%t'
const invalidPassword = '12345'
const emailNotRegisteredInDB = 'bfeuidhdewsccdfnjisck@gmail.com'
const hashedPassword = bcrypt.hashSync(validPassword, 10)

let userInactive1 = new User({email: "user1jewiofji@gmail.com", password: hashedPassword, status: 'inactive', role: 'member'})
let userInactive2 = new User({email: "user2jewiofji@gmail.com", password: hashedPassword, status: 'inactive', role: 'member'})
let userActive3 = new User({email: "user3jewiofji@gmail.com", password: hashedPassword, status: 'active', role: 'member'})
let userInactive4 = new User({email: "user4jewiofji@gmail.com", password: hashedPassword, status: 'inactive', role: 'member'})

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


    describe('GET /user/login', () => {

        describe("good combination with 'active' status", () => {
            it('should return a 200 status with a token', (done) => {
                supertest(app)
                .post('/user/login')
                .send({email: userActive3.email, password: validPassword})
                .then((response) => {
                    expect(response.statusCode).toEqual(200)
                    expect(response.body.token).toBeTruthy()
                    done()
                })
            })
        })
        
        describe("good combination with 'inactive' status", () => {
            it("should return a 401 status with the message 'Unauthorized access'", (done) => {
                supertest(app)
                .post('/user/login')
                .send({email: userInactive2.email, password: validPassword})
                .then((response) => {
                    expect(response.statusCode).toEqual(401)
                    expect(response.body.message).toEqual("Unauthorized access")
                    done()
                })
            })
        ;})

        describe("user active with a wrong password", () => {
            it("should return a 401 status with the message 'Unauthorized access'", (done) => {
                supertest(app)
                .post('/user/login')
                .send({email: userActive3.email, password: 'vuyehwjd&*g67%RtF%Y^%g'})
                .then((response) => {
                    expect(response.statusCode).toEqual(401)
                    expect(response.body.message).toEqual("Unauthorized access")
                    done()
                })
            })
        ;})

    })

})
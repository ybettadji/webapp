import User from '../../app/externalServices/databases/mongodb/models/User.js'

const validEmail = 'testspamwebapp1234@gmail.com'
const validEmail2 = 'testspamwebapp12345@gmail.com'
const invalidEmail = "testspamwebapp1234gmail.com"
const validPassword = 'Awgui6&%t'
const invalidPassword = '12345'
const emailNotRegisteredInDB = 'bfeuidhdewsccdfnjisck@gmail.com'

let userInactive1 = new User({email: "user1jewiofji@gmail.com", password: '123456789', status: 'inactive', role: 'member'})
let userInactive2 = new User({email: "user2jewiofji@gmail.com", password: '123456789', status: 'inactive', role: 'member'})
let userActive3 = new User({email: "user3jewiofji@gmail.com", password: '123456789', status: 'inactive', role: 'member'})
let userInactive4 = new User({email: "user4jewiofji@gmail.com", password: '123456789', status: 'inactive', role: 'member'})

export default {
    validEmail,
    validEmail2,
    invalidEmail,
    validPassword,
    invalidPassword,
    emailNotRegisteredInDB,
    userInactive1,
    userInactive2,
    userActive3,
    userInactive4
};
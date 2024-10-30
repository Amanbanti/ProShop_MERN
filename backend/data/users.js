import bcrypt from "bcryptjs";


const users =[
    {
        name : 'Admin Aman',
        email : 'amanbanti2011@gmail.com',
        password: bcrypt.hashSync('Aman0910133980',10),
        isAdmin : true,
    },
    {
        name : 'Aman Banti',
        email : 'amanbanti@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin : false,
    },
    {
        name : 'Aman2',
        email : 'aman2@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin : false,
    }
]


export default users;
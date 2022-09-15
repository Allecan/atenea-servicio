

const createUser ={
    tags:["User"],
    description:"Create User"
}
const SignIn ={
    tags:["User"],
    description:"SignIn User"
}

export const userRoutesDoc  = {
    "/api/v1/user/create-user":{
        post:createUser
    },
    "/api/v1/user/signIn":{
        post:SignIn,
    }
}



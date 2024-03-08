import {users} from '../../dummyData/data.js'

const userResolvers={
    Query:{
        users:()=>{ return users},
        authUser: ()=>{},
        user:(userId)=>{}
    },
    Mutation:{
        signup:(input)=>{},
        login:(input)=>{}
    }

}

export default userResolvers;
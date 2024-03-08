import { transactions } from "../../dummyData/data.js";

const transactionResolvers={
   Query:{
    transactions:()=>{return transactions},
    transaction:(input)=>{}
   },
   Mutation:{
    createTransaction:(payload)=>{},
    updateTransaction:(payload)=>{},
    deleteTransaction:(id)=>{},
   }
}

export default transactionResolvers;
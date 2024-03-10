import Transaction from "../models/transaction.model.js";

const transactionResolvers = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser())
          throw new Error("you are not authorised to perform this action");

        const userId = context.getUser()._id;

        const transactions = await Transaction.find({ userId });

        return transactions;
      } catch (error) {
        console.log("error in getting all transactions", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        if (!context.getUser())
          throw new Error("you are not authorised to perform this action");

        const transaction = await Transaction.findById({ transactionId });

        if (!transaction)
          throw new Error("no transaction found with that transactionId");

        return transaction;
      } catch (error) {
        console.log("error in getting the transaction", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { payload }, context) => {
      try {
        if (!context.getUser())
          throw new Error("you are not authorised to perform this action");

        //create transaction
        const newTransaction= await Transaction.create({
         ...payload,
         userId:context.getUser()._id
       });

        return newTransaction;

      } catch (error) {
        console.log("error in creating transaction", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    updateTransaction: async (_,{payload},context) => {
      try {
         if (!context.getUser())
           throw new Error("you are not authorised to perform this action");
 
         //create transaction
         const updatedTransaction= await Transaction.findByIdAndUpdate(
          payload.transactionId,
          {payload},
          {new:true}
        );
 
        return updatedTransaction;
 
       } catch (error) {
         console.log("error in updating transaction", error);
         throw new Error(error.message || "Internal server error");
       }
    },
    deleteTransaction: async (_,{transactionId},context) => {
      try {
         if (!context.getUser())
           throw new Error("you are not authorised to perform this action");
 
         //create transaction
         const deletedTransaction= await Transaction.findByIdAndDelete(
          transactionId
        );
 
        return deletedTransaction;
 
       } catch (error) {
         console.log("error in deleting transaction", error);
         throw new Error(error.message || "Internal server error");
       }
    },
  },
};

export default transactionResolvers;

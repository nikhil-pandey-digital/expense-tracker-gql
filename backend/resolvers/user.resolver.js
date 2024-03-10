
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolvers = {
  Query: {
    authUser: (_,__,context) => {
      try {
         const user= context.getUser();
         return user;
      } catch (error) {
        console.log("error in authenticating", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    user: async (_,{userId},context) => {
        try {
          const user= await User.findById({userId});
          return user;

        } catch (error) {
          console.log("error in Getting user with the given id", error);
          throw new Error(error.message || "Internal server error");
        }
    },
  },
  Mutation: {
    signup: async (_, input, context) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new Error("every field is required");
        }

        const user = User.findOne({ username });

        if (user) {
          throw new Error("user already exists with provided username");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = bcrypt.hash(password, salt);

        const profilePic =
          gender == "male"
            ? `https://avatar.iran.liara.run/public/boy?username=${username}`
            : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = await User.create({
          username,
          name,
          password: hashedPassword,
          profilePicture: profilePic,
          gender,
        });

        await context.login(newUser); //Initiate a login session for user.
        return newUser;
      } catch (error) {
        console.log("error in signup", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    login: async (_, input, context) => {
      try {
        const { username, password } = input;

        const user = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
        return user;
      } catch (error) {
        console.log("error in login", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    logout: async (_,__, context) => {
      try {
        await context.logout();

        req.session.destroy((err) => {
          if (err) throw err;
        });
        res.clearCookie("connect.sid");
        return {
          message: "Logged out successfully",
        };
      } catch (error) {
        console.log("error in logout", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
};

export default userResolvers;

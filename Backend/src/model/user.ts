import { model, Schema } from "mongoose"

interface IUser {
    FirstName:string,
    LastName:string, 
    email:string,
    password:string

}

const userSchema = new Schema<IUser>({
    FirstName: {type: String, required:true},
    LastName: {type: String, required: true}, 
    email: {type: String , required: true}, 
    password:{type: String, required: true,select:false}
});

const User = model<IUser>("User", userSchema);

export default User;
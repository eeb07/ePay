import  {model , Schema,Types,type ObjectId} from "mongoose"

interface IAccount{
    userId: Types.ObjectId, 
    balance: Number
}


const AccountSchema = new Schema<IAccount>({
   userId:{
    type: Schema.Types.ObjectId, 
    ref:"User",
    required:true
   },
   balance:{
    type:Number,
    required:true
   }

})

const Account = model<IAccount>("account", AccountSchema);
export default Account;

import { useState } from "react"
import axios from "axios"
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";

export const Signup = ()=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-3 h-auto">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox onChange={e=>{
                    setFirstName(e.target.value);
                }} placeholder={"John"} label={"First Name"}/>
                <InputBox onChange={e=>{
                    setLastName(e.target.value)
                }} placeholder={"Doe"} label={"Last Name"} />
                <InputBox onChange={e =>{
                    setEmail(e.target.value)
                }} placeholder={"eeb@gmail.com"} label={"Email"} />
                <InputBox onChange={e=>{
                    setPassword(e.target.value)
                }} placeholder={"1234567"} label={"Password"} />

                <div>
                    <Button label={"Sign up"} onClick={async()=>{
                        await axios.post("http://localhost:3000/api/signup", {
                            firstName,
                            lastName,
                            email,
                            password
                        });
                    }} />
                </div>
            </div>
        </div>

    </div>
}
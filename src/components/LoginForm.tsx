import React, { BaseSyntheticEvent } from "react";
import Form from "./Form/Form.tsx";
import Input from "./Form/Input.tsx";
import Button from "./Button.tsx";
import { login } from "../bff/loginPage.ts";
import Alert from "./Alert.tsx";

interface LoginFormProps {
  onSubmit: (result: boolean) => any
}
const LoginForm: React.FC<LoginFormProps> = (props) => {
  async function onSubmit(event: BaseSyntheticEvent) {
    event.preventDefault();
    const elements = event.currentTarget.elements;

    const { email, pass, remember } = elements;
    const isLogged = await login(email.value, pass.value, remember.checked);
    if (isLogged) {
      props.onSubmit(isLogged);
    } else {
      // showErrorBlock()
    }
  }
  return (
      <>
        <Form onSubmit={async (event: BaseSyntheticEvent) => await onSubmit(event)}>
          <Input id={"email"} title={"Email"} />
          <Input id={"pass"} title={"Password"} />
          <div className={"flex items-center justify-between"}>
            <div className={"flex gap-1 items-center"}>
              <input id="remember" type="checkbox" value="" className="w-4 h-4 rounded"/>
              <label htmlFor="remember" className="">Remember me</label>
            </div>
            <div className={"flex gap-1 items-center"}>
              <a href={"#"} className={"hover:underline"}>Forget password?</a>
            </div>
          </div>
          <Button type={Button.Type.Submit} text={"Sign up"}/>
        </Form>
      {/* TODO Error block */}
      {/*  <Alert text={"Hello"}/>*/}
      </>
  )
}

export default LoginForm;
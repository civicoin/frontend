import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, InputText, Logo, Panel } from "@/shared/ui/components";
import { setAccessToken, CreateMemberSchema } from "@/shared/models";
import { getSystemByName } from "@/shared/api/system.ts";
import { debounce } from "@/shared/utils";
import { signUp, signIn, signInAsSystem } from "@/shared/api/auth.ts";
import { useAppDispatch } from "@/shared/lib";

import { type TabHandler, Tabs } from "./TabsRow.tsx";

interface FormFields extends HTMLFormControlsCollection {
  username: HTMLInputElement,
  systemName: HTMLInputElement,
  password: HTMLInputElement,
}

const TABS = ["Sign in", "Sign up"];
const signUpIndex = TABS.indexOf("Sign up");

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isNewSystem, setIsNewSystem] = useState(false);
  const [systemId, setSystemId] = useState("");

  const checker = debounce(async (systemName: string) => {
    const system = await getSystemByName(systemName);
    // const systemExists = !system.error && system.data.length > 0;
    const systemInfo = system.data.find(info => info.name === systemName);
    setIsNewSystem(systemName !== "" && systemInfo === undefined);
    if (systemInfo !== undefined) {
        setSystemId(systemInfo!.id);
    }
    // if (system.error) {
    //   setIsNewSystem(true);
    // }
  }, 500);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [buttonName, setButtonName] = useState<string>(TABS[0]);

  async function onSignIn(data: CreateMemberSchema & {systemName: string}) {
    const res = data.name !== "" ? await signIn(data) : await signInAsSystem({name: data.systemName, password: data.password});
    if (res.data.accessToken) {
      dispatch(setAccessToken(res.data.accessToken));
      return true;
    }
    return false;
  }

  async function onRegister(data: CreateMemberSchema & {systemName: string}) {
    const res = await signUp(data);
    if (res.response.ok) {
      await onSignIn(data);
      return true;
    } else {
      // TODO warn user
      return false;
    }
  }
  const TABS_HANDLER = [onSignIn, onRegister];

  async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    const { elements } = e.currentTarget as HTMLFormElement;
    const {username, systemName, password} = elements as FormFields;

    if (isNewSystem && activeTabIndex === signUpIndex) {
      navigate("/createSystem", {
        state: {systemName: systemName.value, password: password.value}
      });
    } else {
      const res = await TABS_HANDLER[activeTabIndex]({name: username.value, systemId, password: password.value, systemName: systemName.value});
      res && navigate("/");
    }
  }

  function checkSystemExistence(input: HTMLInputElement) {
    const value = input.value;
    checker(value);
  }

  function onTabChange(i: number) {
    setActiveTabIndex(i);
    const buttonName = TABS[i];
    setButtonName(buttonName);
    // setIsNewSystem(false);
  }

  {/* TODO Error block */}

  return (
      <Panel>
        <div className="w-[600px]">
          <div className="my-8 mx-5 flex flex-col gap-y-3">
            <div className="flex justify-center"><Logo className="text-5xl"/></div>
            <Tabs tabs={TABS} activeTabIndex={activeTabIndex} onClick={onTabChange as TabHandler}/>
            <div className="flex">
              <form className="flex flex-col gap-6 w-full" onSubmit={async (e) => await onFormSubmit(e)}>
                <div className="flex flex-col gap-1">
                  <InputText id="systemName" label="System name" required={true} onChange={(e) => checkSystemExistence(e.target)} />
                  {activeTabIndex === signUpIndex && isNewSystem && (
                      <div className={"text-xl"}>System is not found. New system is going to be created.</div>
                  )}
                  <InputText id="username" label="Username" disabled={isNewSystem}/>
                  <InputText type={"password"} id="password" label="Password" required={true}/>
                </div>
                <Button disabled={activeTabIndex !== signUpIndex && isNewSystem}>{buttonName}</Button>
              </form>
            </div>
          </div>
        </div>
      </Panel>
  )
}
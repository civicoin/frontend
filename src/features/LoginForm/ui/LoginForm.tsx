import { FormEvent, useState } from "react";

import { Button, InputText, Logo, Panel } from "@/shared/ui/components";
import { type TabHandler, Tabs } from "@/features/LoginForm/ui/TabsRow.tsx";
import { CreateMemberSchema } from "@/shared/models";
import { getSystemByName } from "@/shared/api/system.ts";
import { debounce } from "@/shared/utils";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "@/shared/api/auth.ts";
import { useJWTToken } from "@/shared/lib";

interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement,
  systemName: HTMLInputElement,
  password: HTMLInputElement,
}

const TABS = ["Sign up", "Sign in"];

const defaultActiveTabIndex = 0;
export function LoginForm() {
  const navigate = useNavigate();
  const {saveToken} = useJWTToken();
  const [isNewSystem, setIsNewSystem] = useState(false);
  const [systemId, setSystemId] = useState("");

  const checker = debounce(async (systemName: string) => {
    const system = await getSystemByName(systemName);
    const systemExists = !system.error && system.data.length > 0;
    setIsNewSystem(!systemExists);
    if (systemExists) {
      const systemInfo = system.data.find(info => info.name === systemName);
      setSystemId(systemInfo!.id)
    }
    // if (system.error) {
    //   setIsNewSystem(true);
    // }
  }, 500);

  const [activeTabIndex, setActiveTabIndex] = useState(defaultActiveTabIndex);
  const btnName = TABS[defaultActiveTabIndex];
  const [buttonName, setButtonName] = useState<string>(btnName);

  async function onSignIn(data: CreateMemberSchema) {
    const res = await signIn(data);
    if (res.data.accessToken) {
      saveToken(res.data.accessToken);
      return true;
    }
    return false;
  }
  async function onRegister(data: CreateMemberSchema) {
    const res = await signUp(data);
    if (res.response.ok) {
      await onSignIn(data);
      return true;
    } else {
      // TODO warn user
      return false;
    }
  }
  const TABS_HANDLER = [onRegister, onSignIn];

  async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    const { elements } = e.currentTarget as HTMLFormElement;
    const {name, systemName, password} = elements as FormFields;

    if (isNewSystem && activeTabIndex === defaultActiveTabIndex) {
      navigate("/createSystem", {
        state: {name: name.value, systemName: systemName.value, password: password.value}
      });
    } else {
      const res = await TABS_HANDLER[activeTabIndex]({name: name.value, systemId, password: password.value});
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
    setIsNewSystem(false);
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
                  {isNewSystem && (
                      <div className={"text-xl"}>System is not found. New system is going to be created.</div>
                  )}
                  <InputText id="name" label="Username" required={true}/>
                  <InputText type={"password"} id="password" label="Password" required={true}/>
                </div>
                <Button>{buttonName}</Button>
              </form>
            </div>
          </div>
        </div>
      </Panel>
  )
}
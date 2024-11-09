import { FormEvent, useState } from "react";

import { Button, InputText, Logo, Panel } from "@/shared/ui/components";
import { TabHandler, Tabs } from "@/features/LoginForm/ui/TabsRow.tsx";
import { signIn, signUp } from "@/features/LoginForm/api/auth.ts";
import { CreateMemberSchema } from "@/features/LoginForm/models";

interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement,
  systemId: HTMLInputElement,
  password: HTMLInputElement,
}

async function onRegister(data: CreateMemberSchema) {
  const response = await signUp(data);
  console.log(response);
}

async function onSignIn(data: CreateMemberSchema) {
  const response = await signIn(data);
  console.log(response);
}

const TABS = ["Sign up", "Sign in"];
const TABS_HANDLER = [onRegister, onSignIn];

const defaultActiveTabIndex = 0;
export function LoginForm() {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultActiveTabIndex);
  const btnName = TABS[defaultActiveTabIndex];
  const [buttonName, setButtonName] = useState<string>(btnName);

  async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    const { elements } = e.currentTarget as HTMLFormElement;
    const {name, systemId, password} = elements as FormFields;

    await TABS_HANDLER[activeTabIndex]({name: name.value, systemId: systemId.value, password: password.value});
  }

  const onTabChange: TabHandler = (i) => {
    setActiveTabIndex(i);
    const buttonName = TABS[i];
    setButtonName(buttonName);
  }

  {/* TODO Error block */}

  return (
      <Panel>
        <div className="w-[600px]">
          <div className="my-8 mx-5 flex flex-col gap-y-3">
            <div className="flex justify-center"><Logo className="text-5xl"/></div>
            <Tabs tabs={TABS} activeTabIndex={activeTabIndex} onClick={onTabChange}/>
            <div className="flex">
              <form className="flex flex-col gap-6 w-full" onSubmit={async (e) => await onFormSubmit(e)}>
                <div className="flex flex-col gap-1">
                  <InputText id="systemId" label="System ID" required={true}/>
                  <InputText id="name" label="Username" required={true}/>
                  <InputText id="amount" label="Password" required={true}/>
                </div>
                <Button>{buttonName}</Button>
              </form>
            </div>
          </div>
        </div>
      </Panel>
  )
}
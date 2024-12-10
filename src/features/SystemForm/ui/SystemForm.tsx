import { Button, InputText, Logo, Panel } from "@/shared/ui/components";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { createSystem } from "@/features/SystemForm/api";
import { useLocation, useNavigate } from "react-router-dom";
import { signIn, signUp } from "@/shared/api/auth.ts";
import { debounce } from "@/shared/utils";
import { getSystemByName } from "@/shared/api/system.ts";
import { useJWTToken } from "@/shared/lib";

interface FormFields extends HTMLFormControlsCollection {
  systemName: HTMLInputElement,
  systemPassword: HTMLInputElement,
  coinName: HTMLInputElement
}

function SystemForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const {saveToken} = useJWTToken();
  const [isNewSystem, setIsNewSystem] = useState(false);
  const checker = debounce(async (systemName: string) => {
    const system = await getSystemByName(systemName);
    const systemExists = !system.error && system.data.length > 0;
    setIsNewSystem(!systemExists);
  }, 500);

  useEffect(() => {
    if (location.state !== null) {
      checker(location.state.systemName);
    }
  }, []);

  const onFormSubmit = useCallback(async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    const {elements} = e.currentTarget as HTMLFormElement;
    const {systemName, systemPassword, coinName} = elements as FormFields;

    const systemInfo = await createSystem({name: systemName.value, password: systemPassword.value, coin: coinName.value})
    if (systemInfo.response.ok && location.state) {
      const { name, password } = location.state;
      const data = {name, systemId: systemInfo.data.id, password};
      const newUser = await signUp(data);
      if (newUser.response.ok) {
        const sign = await signIn(data);
        if (sign.response.ok) {
          saveToken(sign.data.accessToken);
          navigate("/");
        }
      }
    } else {
      navigate("/login");
      // TODO warn user and navigate after timeout
    }
  }, []);

  const checkSystemExistence = useCallback(function checkSystemExistence(e: HTMLInputElement) {
    const value = e.value;
    checker(value);
  }, []);

  return (
      <Panel>
        <div className="w-[600px]">
          <div className="my-8 mx-5 flex flex-col gap-y-3">
            <div className="flex justify-center"><Logo className="text-5xl"/></div>
            <div className="flex">
              <form className="flex flex-col gap-6 w-full" onSubmit={async (e) => await onFormSubmit(e)}>
                <div className="flex flex-col gap-1">
                  <InputText id="systemName" label="System name" disabled={location.state !== null}
                             value={location.state !== null ? location.state.systemName : undefined} required={true} onChange={(e) => checkSystemExistence(e.currentTarget)}/>
                  {/*<InputText id="systemName" label="System name" required={true}/>*/}
                  {isNewSystem && (
                      <div className={"text-xl"}>System is not found. New system is going to be created.</div>
                  )}
                  <InputText type={"password"} id="systemPassword" label="System password" required={true}/>
                  <InputText id="coinName" label="Coin name" required={true}/>
                </div>
                <Button>{"Create new system"}</Button>
              </form>
            </div>
          </div>
        </div>
      </Panel>
  )
}

export {SystemForm};
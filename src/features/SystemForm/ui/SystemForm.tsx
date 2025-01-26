import { FormEvent, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, InputText, Logo, Panel } from "@/shared/ui/components";
import { debounce } from "@/shared/utils";
import { getSystemByName } from "@/shared/api/system.ts";
import { signInAsSystem } from "@/shared/api/auth.ts";
import { useAppDispatch } from "@/shared/lib";
import { setAccessToken } from "@/shared/models";

import { createSystem } from "../api";

interface FormFields extends HTMLFormControlsCollection {
  systemName: HTMLInputElement,
  systemPassword: HTMLInputElement,
  coinName: HTMLInputElement
}

function SystemForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isNewSystem, setIsNewSystem] = useState(false);
  const checker = debounce(async (systemName: string) => {
    const system = await getSystemByName(systemName);
    const systemExists = !system.error && system.data.length > 0;
    setIsNewSystem(!systemExists);
  }, 500);

  const [systemName, setSystemName] = useState("");
  const [systemPassword, setSystemPassword] = useState("");

  useEffect(() => {
    if (location.state !== null) {
      const { systemName, password } = location.state;
      checker(systemName);
      setSystemName(systemName);
      setSystemPassword(password);
    }
  }, []);

  const onFormSubmit = useCallback(async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    const {elements} = e.currentTarget as HTMLFormElement;
    const {systemName, systemPassword, coinName} = elements as FormFields;
    const systemCredentials = { name: systemName.value, password: systemPassword.value };

    const systemInfo = await createSystem({...systemCredentials, coin: coinName.value})
    if (systemInfo.response.ok) {
      const signed = await signInAsSystem(systemCredentials);
      if (signed.response.ok) {
        dispatch(setAccessToken(signed.data.accessToken));
        navigate("/");
      }
    } else {
      navigate("/login");
      // TODO warn user and navigate after timeout
    }
  }, []);

  const onSystemNameChange = useCallback(function onSystemNameChange(e: HTMLInputElement) {
    const value = e.value;
    setSystemName(value);
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
                  <InputText id="systemName" label="System name" onChange={(e) => onSystemNameChange(e.currentTarget)}
                             value={systemName} required={true} />
                  {!isNewSystem && (
                      <div className={"text-xl"}>System already exists.</div>
                  )}
                  <InputText type="password" id="systemPassword" label="System password" onChange={(e) => setSystemPassword(e.currentTarget.value)}
                             value={systemPassword} required={true}/>
                  <InputText id="coinName" label="Coin name" required={true}/>
                </div>
                <Button disabled={!isNewSystem}>{"Create new system"}</Button>
              </form>
            </div>
          </div>
        </div>
      </Panel>
  )
}

export {SystemForm};
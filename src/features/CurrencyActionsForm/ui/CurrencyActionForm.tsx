import { useNavigate } from "react-router-dom";

import { Button, InputText } from "@/shared/ui/components";
import ArrowUp from "@/shared/ui/assets/icons/arrow_up.svg?react";
import { Panel } from "@/shared/ui/components/Panel";

export function CoinActionsForm() {
  const navigate = useNavigate();

  function onSend() {
    navigate("/");
  }

  return (
    <Panel>
      <div className="w-[500px]">
        <div className="my-8 mx-5 flex flex-col gap-y-2">
          <div className="flex justify-center text-5xl leading-tight font-semibold">
              Send&nbsp;<span className="ellipsis">BigCoinNameBig</span>
          </div>
          <form className="flex flex-col gap-6" onSubmit={onSend}>
            <div className="flex flex-col gap-1">
              <InputText id="recepient" label="Recepient (username)" required={true}/>
              <InputText id="amount" label="Amount" required={true}/>
            </div>
            <Button>
              <ArrowUp />&nbsp;Send
            </Button>
          </form>
        </div>
      </div>
    </Panel>
  )
}


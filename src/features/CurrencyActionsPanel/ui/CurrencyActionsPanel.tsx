import { useNavigate } from "react-router-dom";

import { Button, Panel } from "@/shared/ui/components";
import ArrowUp from "@/shared/ui/assets/icons/arrow_up.svg?react";

export function CurrencyActionsPanel() {
  const navigate = useNavigate();

  function onSend() {
    navigate("/send");
  }
  return (
    // TODO remove coin dummy name
    <Panel>
      <div className="w-[650px]">
        <div className="my-8 mx-5 flex flex-col gap-y-8">
          <div className="flex justify-center text-5xl leading-tight font-semibold gap-1">
            <span className="ellipsis">BigCoinNameBig</span>
            <div>Icon</div>
          </div>
          <div className="flex justify-center text-4xl font-semibold">
            <div className="ellipsis">99999999999999999999</div>
            <div>CoinName'coins</div>
          </div>
          <div className="flex justify-around gap-x-7">
            <Button onClick={onSend}>
              <ArrowUp />&nbsp;Send
            </Button>
            {/* <Button>
              <ArrowUp transform="rotate(180)"/>&nbsp;Request
            </Button> */}
          </div>
          {/* <div className="flex justify-center">
            <div className="bg-light rounded-2xl cursor-pointer w-full flex justify-center items-center py-2">
              Contracts
            </div>
          </div> */}
          {/* <div className="flex justify-center">
            <div className="bg-light rounded-2xl cursor-pointer w-full flex justify-center items-center py-2">
              History
            </div>
          </div> */}
        </div>
      </div>
    </Panel>
  )
}
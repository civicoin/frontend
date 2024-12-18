import { useNavigate } from "react-router-dom";
import { Button, Panel } from "@/shared/ui/components";
import ArrowUp from "@/shared/ui/assets/icons/arrow_up.svg?react";
import { useEffect, useState } from "react";
import { getMe } from "@/shared/api/user.ts";
import { getBalance, getSystemById } from "@/shared/api/system.ts";
import { JWTToken, useJWTToken } from "@/shared/lib/hooks.ts";

async function fetchData(token: JWTToken) {
  const balance = await getBalance(token);
  const { data: { systemId } } = await getMe(token);
  const { data: { coin } } = await getSystemById(systemId);

  return {balance: balance.data, coinName: coin}
}

export function CurrencyActionsPanel() {
  const navigate = useNavigate();
  const { token } = useJWTToken();
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    if (token) {
      fetchData(token).then(res => {
        setBalance(res.balance);
        setCurrency(res.coinName);
      });
    }
  }, []);

  return (
    <Panel>
      <div className="w-[650px]">
        <div className="my-8 mx-5 flex flex-col gap-y-8">
          <div className="flex justify-center text-5xl leading-tight font-semibold gap-1">
            <span className="ellipsis">{currency}</span>
            {/*<div>Icon</div>*/}
          </div>
          <div className="flex justify-center text-4xl font-semibold">
            <div className="ellipsis">{balance}</div>&nbsp;<div>{currency}'coins</div>
          </div>
          <div className="flex justify-around gap-x-7">
            <Button onClick={() => navigate("/send")}>
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
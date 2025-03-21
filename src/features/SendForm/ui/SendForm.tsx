import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { Panel } from "@/shared/ui/components/Panel";
import ArrowUp from "@/shared/ui/assets/icons/arrow_up.svg?react";
import { getMe, getMembersByName } from "@/shared/api/system";
import { getUserBalance } from "@/shared/api/user";
import { useAppSelector } from "@/shared/lib";
import { getToken, JWTToken } from "@/shared/models/user";
import { MemberResponseSchema } from "@/shared/models";
import { send } from "@/shared/api/transaction";
import { debounce } from "@/shared/utils";
import { Button, DropdownInput, InputText } from "@/shared/ui/components";
import { useTokenDecode as parseToken } from "@/shared/lib/hooks";

const onSend = async (token: JWTToken, receiverData: MemberResponseSchema, amount: string) => {
  await send(token, receiverData.id, amount);
}

export function SendForm() {
  const navigate = useNavigate();
  const token = useAppSelector(getToken);

  const [currency, setCurrency] = useState("");

  const balance = useRef<string>();
  useEffect(() => {
    getMe(token!).then(info => {
      setCurrency(info.data.coin);
      return getUserBalance(token!);
    }).then(res => {
      balance.current = res.data;
    });
  }, []);

  const [foundMembersNames, setFoundMembersNames] = useState<string[]>([]);
  const [foundMembersData, setFoundMembersData] = useState<MemberResponseSchema[]>([]);

  const [receiverName, setReceiverName] = useState<string | undefined>();
  const [receiverData, setReceiverData] = useState<MemberResponseSchema>();

  const [amount, setAmount] = useState("");

  const [errors, setErrors] = useState<{ receiver?: boolean; amount?: boolean }>({});

  const findCheckMembers = debounce(async (memberName: string) => {
    const membersResponse = await getMembersByName(token!, memberName);
    const { data } = membersResponse;

    const parsedToken = parseToken(token!);
    const membersData = data.filter(dt => dt.id !== parsedToken.id);
    setFoundMembersData(membersData);

    const foundMembersNames: string[] = [];
    let found = false;
    membersData.forEach(memberData => {
      foundMembersNames.push(memberData.name);
      if (memberData.name === memberName) {
        setReceiverData(memberData);
        found = true;
      }
    });
    setErrors({...errors, receiver: !found});
    setFoundMembersNames(foundMembersNames);
  }, 500);

  return (
    <Panel>
      <div className="w-[500px]">
        <div className="my-8 mx-5 flex flex-col gap-y-2">
          <div className="flex justify-center text-5xl leading-tight font-semibold">
            Send&nbsp;<span className="ellipsis">{currency}</span>
          </div>
          <form className="flex flex-col gap-6" onSubmit={async (e) => {
            e.preventDefault();
            if (errors.receiver || errors.amount) {
              return;
            }
            await onSend(token, receiverData!, amount);
            navigate("/");
          }}>
            <div className="flex flex-col gap-1">
              <DropdownInput variants={foundMembersNames} id="receiver" value={receiverName}
                             label="Receiver (username)" required
                             onChange={(e) => {
                               const {value} = e.target;
                               findCheckMembers(value);
                               setReceiverName(value);
                             }}
                             onChoose={(memberName) => {
                               const receiverData = foundMembersData.find(member => member.name === memberName);
                               setReceiverData(receiverData);
                               setErrors({...errors, receiver: false});
                             }}/>
              {errors.receiver && (<div className={"text-xl"}>Member is not found.</div>)}

              <InputText id="amount" label="Amount" required value={amount} onChange={(e) => {
                setAmount(e.target.value);
                if (balance.current !== undefined) {
                  const amountError = e.target.value > balance.current;
                  setErrors({...errors, amount: amountError});
                }
              }}/>
              {errors.amount && (<div className={"text-xl"}>Amount is more than you have.</div>)}
            </div>
            <Button>
              <ArrowUp/>&nbsp;Send
            </Button>
          </form>
        </div>
      </div>
      {/*<CurrencyActionsForm actionString={actionString} buttonName={"Send"} onAction={onSend}/>*/}
    </Panel>
  )
}

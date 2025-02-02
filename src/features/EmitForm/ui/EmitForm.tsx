import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Panel } from "@/shared/ui/components/Panel";
import ArrowUp from "@/shared/ui/assets/icons/arrow_up.svg?react";
import { getMe, getMembersByName } from "@/shared/api/system";
import { useAppSelector } from "@/shared/lib";
import { getToken, JWTToken } from "@/shared/models/user";
import { issue } from "@/shared/api/transaction";
import { MemberResponseSchema } from "@/shared/models";
import { Button, DropdownInput, InputText } from "@/shared/ui/components";
import { debounce } from "@/shared/utils";

const onEmit = async (token: JWTToken, receiverData: MemberResponseSchema, amount: string) => {
  await issue(token, receiverData.id, amount);
}

export function EmitForm() {
  const navigate = useNavigate();
  const token = useAppSelector(getToken);

  const [currency, setCurrency] = useState("");
  useEffect(() => {
    getMe(token!).then(info => {
      setCurrency(info.data.coin);
    });
  }, []);

  const [foundMembersNames, setFoundMembersNames] = useState<string[]>([]);
  const [foundMembersData, setFoundMembersData] = useState<MemberResponseSchema[]>([]);

  const [receiverName, setReceiverName] = useState<string | undefined>();
  const [receiverData, setReceiverData] = useState<MemberResponseSchema>();

  const [amount, setAmount] = useState("");

  const [errors, setErrors] = useState<{ receiver?: boolean }>({});

  const findMembers = debounce(async (memberName: string) => {
    const membersResponse = await getMembersByName(token!, memberName);
    const { data: membersData } = membersResponse;
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
    setErrors({receiver: !found});
    setFoundMembersNames(foundMembersNames);
  }, 500);

  return (
    <Panel>
      <div className="w-[500px]">
        <div className="my-8 mx-5 flex flex-col gap-y-2">
          <div className="flex justify-center text-5xl leading-tight font-semibold">
            Emit&nbsp;<span className="ellipsis">{currency}</span>
          </div>
          <form className="flex flex-col gap-6" onSubmit={async (e) => {
            e.preventDefault();
            await onEmit(token, receiverData!, amount);
            navigate("/");
          }}>
            <div className="flex flex-col gap-1">
              <DropdownInput variants={foundMembersNames} id="receiver" value={receiverName}
                             label="Receiver (username)" required
                             onChange={(e) => {
                               const {value} = e.target;
                               findMembers(value);
                               setReceiverName(value);
                             }}
                             onChoose={(memberName) => {
                               const receiverData = foundMembersData.find(member => member.name === memberName);
                               setReceiverData(receiverData);
                               setErrors({receiver: false});
                             }}/>

              {errors.receiver && (<div className={"text-xl"}>Member is not found.</div>)}
              <InputText id="amount" label="Amount" required value={amount} onChange={(e) => setAmount(e.target.value)}/>
            </div>
            <Button>
              <ArrowUp/>&nbsp;Emit
            </Button>
          </form>
        </div>
      </div>
      {/*<CurrencyActionsForm actionString={actionString} buttonName={"Emit"} onAction={onEmit}/>*/}
    </Panel>
  )
}


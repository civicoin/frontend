import { useState } from "react";

import { Button, DropdownInput, InputText } from "@/shared/ui/components";
import ArrowUp from "@/shared/ui/assets/icons/arrow_up.svg?react";
import { Panel } from "@/shared/ui/components/Panel";
import { getMembersByName } from "@/shared/api/system";
import { debounce } from "@/shared/utils";
import { useAppSelector } from "@/shared/lib";
import { getToken } from "@/shared/models/user";
import { MemberResponseSchema } from "@/shared/models";

interface CurrencyActionFormProps {
  actionString: JSX.Element | string,
  buttonName: string,
  onAction: (receiverData: MemberResponseSchema, amount: string) => unknown
}

export function CoinActionsForm({ actionString, buttonName, onAction }: CurrencyActionFormProps) {
  // const navigate = useNavigate();
  const token = useAppSelector(getToken);
  const [foundMembersNames, setFoundMembersNames] = useState<string[]>([]);
  const [foundMembersData, setFoundMembersData] = useState<MemberResponseSchema[]>([]);

  const [receiverName, setReceiverName] = useState<string | undefined>();
  const [receiverData, setReceiverData] = useState<MemberResponseSchema>();
  const [amount, setAmount] = useState("");

  const findMembers = debounce(async (memberName: string) => {
    const membersResponse = await getMembersByName(token!, memberName);
    const { data: membersData } = membersResponse;
    setFoundMembersData(membersData);

    const foundMembersNames: string[] = [];
    membersData.forEach(memberData => {
      foundMembersNames.push(memberData.name);
      if (memberData.name === memberName) {
        setReceiverData(memberData);
      }
    });
    setFoundMembersNames(foundMembersNames);
  }, 500);

  return (
    <Panel>
      <div className="w-[500px]">
        <div className="my-8 mx-5 flex flex-col gap-y-2">
          <div className="flex justify-center text-5xl leading-tight font-semibold">
            {actionString}
          </div>
          <form className="flex flex-col gap-6" onSubmit={(e) => {
            e.preventDefault();
            onAction(receiverData!, amount);
          }}>
            <div className="flex flex-col gap-1">
              <DropdownInput variants={foundMembersNames} id="receiver" value={receiverName} label="Receiver (username)" required
                onChange={(e) => {
                  const { value } = e.target;
                  findMembers(value);
                  setReceiverName(value);
                }}
                onChoose={(memberName) => {
                  const receiverData = foundMembersData.find(member => member.name === memberName);
                  setReceiverData(receiverData);
                }} />
              {(!(foundMembersNames.length > 0)) && (<div className={"text-xl"}>Member is not found.</div>)}
              <InputText id="amount" label="Amount" required value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <Button>
              <ArrowUp />&nbsp;{buttonName}
            </Button>
          </form>
        </div>
      </div>
    </Panel>
  )
}

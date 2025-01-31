import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { Panel } from "@/shared/ui/components/Panel";
import { CurrencyActionsForm } from "@/widgets/CurrencyActionsForm";
import { getMe } from "@/shared/api/system";
import { useAppSelector } from "@/shared/lib";
import { getToken } from "@/shared/models/user";

export function SendForm() {
  const navigate = useNavigate();
  const token = useAppSelector(getToken);

  const [currency, setCurrency] = useState("");

  function onSend() {
    navigate("/");
  }

  useEffect(() => {
    getMe(token!).then(info => {
      setCurrency(info.data.coin);
    });
  }, []);

  const actionString: JSX.Element = useMemo(() => {
    return (<>Send&nbsp;<span className="ellipsis">{currency}</span></>)
  }, [currency]);

  return (
      <Panel>
        <CurrencyActionsForm actionString={actionString} buttonName={"Send"} onAction={onSend} />
      </Panel>
  )
}


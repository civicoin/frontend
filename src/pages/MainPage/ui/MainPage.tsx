import { useMemo } from "react";

import { CurrencyActionsAdminPanel, CurrencyActionsUserPanel } from "@/features/CurrencyActionsPanel";
import { useAppSelector } from "@/shared/lib";
import { getToken } from "@/shared/models/user";
import { useTokenDecode as parseToken } from "@/shared/lib/hooks";
import { UserRole } from "@/shared/models";

export function MainPage() {
  const token = useAppSelector(getToken);

  const Element = useMemo(() => {
    let result = () => <></>;
    if (token) {
      const decodedData = parseToken(token);
      switch (decodedData.role) {
        case UserRole.ADMIN:
          result = CurrencyActionsAdminPanel;
          break;
        case UserRole.MEMBER:
          result = CurrencyActionsUserPanel;
          break;
      }
    }

    return result;
  }, [token]);

  return <Element />;
}

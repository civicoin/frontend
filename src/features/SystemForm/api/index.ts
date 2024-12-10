import { CreateSystemSchema } from "@/features/SystemForm/models";
import { POST } from "@/shared/api/client.ts";
import { throwAnyErrors } from "@/shared/utils";

type TempSystemSchema = {
  name: string,
  coin: string,
  password: string,
}
const defaultSystemProps: CreateSystemSchema = {
  name: "",
  description: undefined,
  coin: "",
  restriction: "PRIVATE",
  issuance: {
    type: "LIMITED",
    limit: undefined
  },
  password: ""
}

export async function createSystem(props: TempSystemSchema) {
  const options: CreateSystemSchema = {...defaultSystemProps, ...props};
  return await throwAnyErrors(POST("/system", {
    body: {
      ...options
    }
  }))
}

import { Logo, Panel } from "@/shared/ui/components";

function Tab({text}: {text: string}) {
  return (
    <div className="w-1/2">{text}</div>
  )
}

export function LoginForm() {
  return (
    <Panel>
      <div className="w-[650px]">
        <div className="my-8 mx-5 flex flex-col gap-y-2">
          <div className="flex justify-center"><Logo className="text-5xl"/></div>
          <div className="flex">
            <Tab text="Sign up" />
            <Tab text="Log in" />
            <div className="w-1/2">Sign up</div>
            <div className="w-1/2">Log in</div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
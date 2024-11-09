export type TabHandler = (i: number, text: string) => void;
interface TabProps {
  tabs: string[],
  activeTabIndex: number,
  onClick: TabHandler
}

export function Tabs({tabs, activeTabIndex, onClick}: TabProps) {
  // const [activeTabIdx, setActiveTabIdx] = useState(activeTabIndex);
  const onTabClick: TabHandler = (i, text) => {
    if (i === activeTabIndex) return;
    // setActiveTabIdx(i);
    onClick(i, text);
  }

  return (
      <>
        <div className="flex">
          {tabs.map((text, i) => (
              <div key={i} className="w-1/2 text-2xl text-center cursor-pointer"
                   onClick={() => onTabClick(i, text)}>{text}</div>
          ))}
        </div>
        <div style={{
          width: `${100 / tabs.length}%`,
          left: `${100 / tabs.length * activeTabIndex}%`,
        }} className="relative h-1 bg-black"></div>
      </>
  )
}
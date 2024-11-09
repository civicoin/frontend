interface LogoProps {
  className?: string,
  style?: object
}
export function Logo({className, style}: LogoProps) {
  return (
    <span style={style} className={`font-semibold text-4xl ${className}`}>civicoin</span>
  )
}

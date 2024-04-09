
function Header({ label }: {label: string}) {
  return (
    <div className="font-bold text-4xl pt-6 text-center">
      {label}
    </div>
  )
}

export default Header
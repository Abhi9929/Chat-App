import { Link } from 'react-router-dom'

function Bottom({warning, to, label}: {warning: string, to: string, label: string}) {
    return <div className="text-center">
        {warning}
        <Link className='pl-1 underline cursor-pointer' to={to}>{label}</Link>
    </div>
}

export default Bottom
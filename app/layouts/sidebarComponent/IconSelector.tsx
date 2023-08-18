
interface IconSelectorProps{
    iconType?:string | null
}

export default function IconSelector({iconType}:IconSelectorProps){
    return(
        <>
            {iconType && iconType === 'create' && <i className="fa-solid fa-folder"></i>}
            {iconType && iconType === 'list' && <i className="fa-solid fa-list"></i>}
            {iconType && iconType === 'search' && <i className="fa-solid fa-magnifying-glass"></i>}
            {iconType && iconType === 'chart' && <i className="fa-solid fa-chart-simple"></i>}
        </>
    )
}
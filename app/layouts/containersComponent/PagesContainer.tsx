
export default function PagesContainer({children}: {children: React.ReactNode}) {
    return (             
            <div id="content" className="row">     
                <div id="sectionCentral" className="col-md-10">
                    {children}
                </div>
            </div>         
    )
}

export default function Container(props) {
    return (
        <div id="container-all" className="wrap col-md-12">
            <div className="clearfix"></div>
            <div id="content" className="row">
                <div id="sectionCentral" className="col-md-10">
                    {props.children}
                </div>
            </div>
        </div>
    )
}
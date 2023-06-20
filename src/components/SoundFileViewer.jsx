function SoundFileViewer({file}){
    var file_path_parts = file["file"].split("/");
    var first_path_part = file_path_parts.slice(0,-1).join("/");
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-3">
                    <div className="card">
                        <div className="card-body py-2">
                            <span className="opacity-25">{first_path_part+"/"}</span>
                            <b>{file_path_parts.slice(-1)}</b>
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="card">
                        <div className="card-body py-2">
                            <div className="row">
                                <input type="range"/>
                                salope
                            </div>
                            <div className="row">
                                <input type="range"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default SoundFileViewer
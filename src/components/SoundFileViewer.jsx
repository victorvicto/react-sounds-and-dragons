import { useState } from 'react';
import VolumeProfile from "./VolumeProfile.jsx";

function SoundFileViewer({file}){
    const [start_time, set_start_time] = useState(file["start"]);
    const [end_time, set_end_time] = useState(file["end"]);
    const [real_start_time, set_real_start_time] = useState(file["real start"]);
    const [real_end_time, set_real_end_time] = useState(file["real end"]);

    function start_time_update(event){
        if (event.target.value>=real_start_time){
            set_start_time(real_start_time);
        } else {
            set_start_time(event.target.value);
        }
    }

    function real_start_time_update(event){
        if (event.target.value<=start_time){
            set_real_start_time(start_time);
        } else if (event.target.value>=real_end_time) {
            set_real_start_time(real_end_time);
        } else {
            set_real_start_time(event.target.value);
        }
    }

    function real_end_time_update(event){
        if (event.target.value<=real_start_time){
            set_real_end_time(real_start_time);
        } else if (event.target.value>=end_time) {
            set_real_end_time(end_time);
        } else {
            set_real_end_time(event.target.value);
        }
    }

    function end_time_update(event){
        if (event.target.value<=real_end_time){
            set_end_time(real_end_time);
        } else {
            set_end_time(event.target.value);
        }
    }

    var file_path_parts = file["file"].split("/");
    var first_path_part = file_path_parts.slice(0,-1).join("/");
    return (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col-4">
                    <div className="card m-1">
                        <div className="card-body py-2">
                            <span className="opacity-25">{first_path_part+"/"}</span>
                            <b>{file_path_parts.slice(-1)}</b>
                        </div>
                    </div>
                    <div className='m-1 row'>
                        <div className='col-6 p-1 d-grid'>
                            <button className='btn btn-outline-info'>Play</button>
                        </div>
                        <div className='col-6 p-1 d-grid'>
                            <button className='btn btn-outline-success'>Save</button>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card-body py-2">
                        <div className="row">
                                <input type="range" min="0.0" max="1.0" step="0.001" value={start_time} onChange={start_time_update}/>
                            </div>
                            <div className="row">
                                <input type="range" min="0.0" max="1.0" step="0.001" value={real_start_time} onChange={real_start_time_update}/>
                            </div>
                            {("volume profile" in file) && 
                                <VolumeProfile  samples={file["volume profile"]} 
                                                start={start_time} 
                                                real_start={real_start_time} 
                                                real_end={real_end_time}
                                                end={end_time}/>}
                            <div className="row">
                                <input type="range" min="0.0" max="1.0" step="0.001" value={real_end_time} onChange={real_end_time_update}/>
                            </div>
                            <div className="row">
                                <input type="range" min="0.0" max="1.0" step="0.001" value={end_time} onChange={end_time_update}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default SoundFileViewer
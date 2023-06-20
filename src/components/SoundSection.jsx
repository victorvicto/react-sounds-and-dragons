import { useState } from 'react';
import SoundFileViewer from './SoundFileViewer';

function SoundSection({sound_name, files, category}) {
    const [collapsed, set_collapsed] = useState(true);

    return (
        <div className='card m-2 shadow'>
            <h4 className="card-header text-capitalize"
                role="button"
                onClick={() => {set_collapsed(!collapsed)}}>
                    {sound_name+"   "}
                    <i className={'small bi bi-chevron-'+(collapsed?"down":"up")}></i>
            </h4>
            <ul className={"list-group list-group-flush collapse"+(collapsed?"":".show")}>
                {files.map((f)=>
                    <SoundFileViewer key={f["file"]} file={f}/>
                )}
            </ul>
        </div>

    )
}
  
export default SoundSection
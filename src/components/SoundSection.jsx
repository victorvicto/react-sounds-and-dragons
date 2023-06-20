import { useState } from 'react';

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
            <div className={"card-body collapse"+(collapsed?"":".show")}>
                {category}
            </div>
        </div>

    )
}
  
export default SoundSection
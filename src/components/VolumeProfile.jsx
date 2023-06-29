import setVolumeProfile from "../extractors.js";
import { useState } from 'react';

function VolumeProfile({file, start, real_start, real_end, end}){
    const [profile, set_profile] = useState(file["volume profile"]);
    if(profile==null){
        setVolumeProfile(file, set_profile);
        return (<div className="card volume-profile"></div>)
    }

    return (
        <div className="card volume-profile">
            {profile.map((val, i)=>{
                var mul = 1;
                if (real_start*100>i) {
                    mul = (i-start*100)/((real_start-start)*100);
                } else if (real_end*100<i){
                    mul = 1-((i-real_end*100)/((end-real_end)*100));
                }
                mul = Math.max(0,mul);
                return <div key={"sound-bar-"+i} className="sound-bar" style={{"height": val*100*mul+"%"}}></div>
            })}
        </div>
    )
}

export default VolumeProfile
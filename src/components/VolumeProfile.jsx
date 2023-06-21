function VolumeProfile({samples, start, real_start, real_end, end}){
    
    return (
        <div className="card volume-profile">
            {samples.map((val, i)=>{
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
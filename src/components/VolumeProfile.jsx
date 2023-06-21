function VolumeProfile({samples, start, end}){
    
    return (
        <div className="card volume-profile">
            {samples.map((val, i)=>{
                return <div key={"sound-bar-"+i} className="sound-bar" style={{"height": val*100+"%"}}></div>
            })}
        </div>
    )
}

export default VolumeProfile
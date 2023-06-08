function LoadingBar({progress_percentage, transition_time}){
    return (
        <div className="progress">
            <div    className="progress-bar bg-warning" 
                    role="progressbar" 
                    style={{ width: progress_percentage+'%', 
                            transitionDuration: transition_time+"s", 
                            transitionTimingFunction: "linear"}} 
                    aria-valuenow={progress_percentage} 
                    aria-valuemin="0" 
                    aria-valuemax="100"></div>
        </div>
    )
}

export default LoadingBar
function ButtonPanel({name, possibilities, is_transitioning, additional_content, button_pressed_func}) {

    function but_click(name){
        console.log(name);
        button_pressed_func(name);
    }

    const buttons = []
    for(var p of possibilities){
        buttons.push(<button    className='btn btn-secondary text-capitalize' 
                                id={name+"-"+p+"-btn"} 
                                key={name+"-"+p+"-btn"} 
                                onClick={(e)=>{but_click(e.target.value);}} 
                                disabled={is_transitioning}
                                value={p}>{p}</button>);
    }
  
    return (
        <div className={'card m-2 '+(is_transitioning ? 'border-warning' : '')}>
            <div className='card-body'>
                <h4 className='card-title'>{ name }</h4>
                {additional_content}
                <div className='d-grid gap-2 mt-2'>
                    {buttons}
                </div>
            </div>
        </div>
    )
  }
  
  export default ButtonPanel
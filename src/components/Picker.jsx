import RadioButton from './RadioButton.jsx';

function Picker({name, possibilities, active_radio, set_active_radio, disabled}) {

    function radio_click(name){
        console.log(name);
        set_active_radio(name);
    }

    const radio_buts = [];
    for(var p of possibilities){
        // radio_buts.push(<input  type='radio' 
        //                         className='btn-check' 
        //                         id={name+"-"+p+"-btnradio"} 
        //                         readOnly 
        //                         key={name+"-"+p+"-btnradio"} 
        //                         value={p} 
        //                         onClick={(e)=>{radio_click(e.target.value);}} 
        //                         checked={active_radio==p} 
        //                         autoComplete='off'
        //                         disabled={disabled}/>);
        // radio_buts.push(<label className='btn btn-outline-secondary mt-1 text-capitalize' htmlFor={name+"-"+p+"-btnradio"} key={name+"-"+p+"-btnradio-label"}>{p}</label>);

        radio_buts.push(<RadioButton    title={p}
                                        group_name={name}
                                        selected={p==active_radio}
                                        disabled={disabled}
                                        onclick={(e)=>{radio_click(e.target.value);}}/>)
    }
  
    return (
        <div className='card m-2'>
            <div className='card-body'>
                <h4 className='card-title'>{ name }</h4>
                <div className='btn-group d-flex flex-wrap' role='group'>
                    {radio_buts}
                </div>
            </div>
        </div>
    )
  }
  
  export default Picker
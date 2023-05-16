import { useState } from 'react'

function Picker({name, possibilities}) {
    console.log(possibilities[0]);
    const [active_radio, set_active_radio] = useState(possibilities[0]);

    function radio_click(name){
        console.log(name);
        set_active_radio(name);
    }

    const radio_buts = []
    for(var p of possibilities){
        radio_buts.push(<input type='radio' className='btn-check' id={name+"-"+p+"-btnradio"} key={name+"-"+p+"-btnradio"} value={p} onClick={(e)=>{radio_click(e.target.value);}} checked={active_radio==p} autoComplete='off'/>);
        radio_buts.push(<label className='btn btn-outline-primary mt-1' htmlFor={name+"-"+p+"-btnradio"} key={name+"-"+p+"-btnradio-label"}>{p}</label>);
    }
  
    return (
        <div className='card m-2'>
            <div className='card-body'>
                <h2 className='card-title'>{ name }</h2>
                <div className='btn-group d-flex flex-wrap' role='group'>
                    {radio_buts}
                </div>
            </div>
        </div>
    )
  }
  
  export default Picker
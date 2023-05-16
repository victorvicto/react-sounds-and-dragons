import { useState } from 'react'

function Picker({name, possibilities}) {
    const [active_radio, set_active_radio] = useState(possibilities[0]);

    function radio_click(name){
        set_active_radio(name);
    }

    const radio_buts = []
    var i = 0
    for(var p of possibilities){
        radio_buts.push(<input type='radio' className='btn-check' id={p+"-btnradio"} key={p+"-btnradio"} value={p} onClick={()=>{radio_click(p)}} active={(active_radio==p).toString()} autoComplete='off'/>);
        radio_buts.push(<label className='btn btn-outline-primary mt-1' htmlFor={p+"-btnradio"} key={p+"-btnradio-label"}>{p}</label>);
        i++;
    }
  
    return (
        <div className='card m-2'>
            <div className='card-title'>
                <h2 className='card-title'>{ name }</h2>
            </div>
            <div className='card-body'>
                <div className='btn-group d-flex flex-wrap' role='group'>
                    {radio_buts}
                </div>
            </div>
        </div>
    )
  }
  
  export default Picker
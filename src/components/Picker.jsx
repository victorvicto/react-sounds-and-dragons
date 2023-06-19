import RadioButton from './RadioButton.jsx';

function Picker({name, possibilities, active_radio, set_active_radio, disabled}) {

    function radio_click(name){
        console.log(name);
        set_active_radio(name);
    }
  
    return (
        <div className='card m-2'>
            <div className='card-body'>
                <h4 className='card-title'>{ name }</h4>
                <div className='btn-group d-flex flex-wrap' role='group'>
                    {possibilities.map((p) => 
                        <RadioButton    key={name+"-"+p+"-radiobutton"} 
                                        title={p} 
                                        group_name={name} 
                                        selected={p==active_radio} 
                                        disabled={disabled} 
                                        onclick={(e)=>{radio_click(e.target.value);}}/>
                    )}
                </div>
            </div>
        </div>
    )
  }
  
  export default Picker
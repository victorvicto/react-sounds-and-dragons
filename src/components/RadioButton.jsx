function RadioButton(title, group_name, selected, disabled, onclick){

    return (
        <>
            <input  type='radio' 
                    className='btn-check' 
                    id={group_name+"-"+title+"-btnradio"}
                    key={group_name+"-"+title+"-btnradio"}
                    readOnly
                    value={title} 
                    onClick={onclick} 
                    checked={selected} 
                    autoComplete='off'
                    disabled={disabled}/>
            <label  className='btn btn-outline-secondary mt-1 text-capitalize' 
                    htmlFor={group_name+"-"+title+"-btnradio"}
                    key={group_name+"-"+title+"-btnradio-label"}>{title}</label>
        </>
    )
}

export default RadioButton
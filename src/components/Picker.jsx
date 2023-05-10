import { useState } from 'react'

function Picker({name, possibilities, active_index}) {
    const [count, setCount] = useState(0)
  
    return (
        <div className='card m-2'>
            <div className='card-title'>
                <h2 className='card-title'>{ name }</h2>
            </div>
            <div className='card-body'>
                <div className='btn-group d-flex flex-wrap' role='group'></div>
            </div>
        </div>
    )
  }
  
  export default Picker
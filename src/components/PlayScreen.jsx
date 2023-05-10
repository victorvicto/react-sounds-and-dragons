import Picker from './Picker.jsx';

function PlayScreen({content, active}) {
  
    return (
        <>
            <h1>Play Screen</h1>
            <Picker name="Region"/>
            <Picker name="Place"/>
            <Picker name="Music Context"/>
        </>
    )
  }
  
  export default PlayScreen
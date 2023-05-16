import { useState } from 'react';
import Picker from './Picker.jsx';

function PlayScreen() {
  
    return (
        <>
            <h1>Play Screen</h1>
            <Picker name="Region" possibilities={["test","un","deux"]}/>
            <Picker name="Place" possibilities={["aa","un","deux"]}/>
            <Picker name="Music Context" possibilities={["test","jj","deux"]}/>
        </>
    )
  }
  
  export default PlayScreen
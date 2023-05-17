import { useState } from 'react';
import Picker from './Picker.jsx';
import sound_lore from '../assets/sound_lore.json'

function PlayScreen() {
    const [active_region, set_active_region] = useState("default");
    const [active_place, set_active_place] = useState("default");
    const [active_music_context, set_active_music_context] = useState("main");
    const [active_modifier, set_active_modifier] = useState("no modifier");

    const regions = Object.keys(sound_lore["regions"]);
    const places = Object.keys(sound_lore["places"]);
    var music_contexts = Object.keys(sound_lore["music contexts"]);
    music_contexts = music_contexts.concat(Object.keys(sound_lore["places"][active_place]["music contexts"]));
    const modifiers = Object.keys(sound_lore["places"]);
  
    return (
        <>
            <h1>Play Screen</h1>
            <Picker name="Region" 
                    possibilities={regions} 
                    active_radio={active_region}
                    set_active_radio={set_active_region}/>
            <Picker name="Place" 
                    possibilities={places} 
                    active_radio={active_place}
                    set_active_radio={set_active_place}/>
            <Picker name="Music Context" 
                    possibilities={music_contexts} 
                    active_radio={active_music_context}
                    set_active_radio={set_active_music_context}/>
            <Picker name="Modifier" 
                    possibilities={regions} 
                    active_radio={active_modifier}
                    set_active_radio={set_active_modifier}/>
        </>
    )
  }
  
  export default PlayScreen
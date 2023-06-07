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
    var music_contexts = new Set();
    for (const music_con of Object.keys(sound_lore["music contexts"])){
        music_contexts.add(music_con);
    }
    for (const music_con of Object.keys(sound_lore["places"][active_place]["music contexts"])){
        music_contexts.add(music_con);
    }
    var modifiers = new Set();
    modifiers.add("no modifier");
    if ("ambiance modifiers" in sound_lore["places"][active_place]){
        for (const mod of Object.keys(sound_lore["places"][active_place]["ambiance modifiers"])){
            modifiers.add(mod);
        }
    }
    if ("theme modifiers" in sound_lore["music contexts"][active_music_context]){
        for (const mod of Object.keys(sound_lore["music contexts"][active_music_context]["theme modifiers"])){
            modifiers.add(mod);
        }
    }
    if ("music contexts" in sound_lore["places"][active_place]){
        if (active_music_context in sound_lore["places"][active_place]["music contexts"]){
            if ("theme modifiers" in sound_lore["places"][active_place]["music contexts"][active_music_context]){
                for (const mod of Object.keys(sound_lore["places"][active_place]["music contexts"][active_music_context]["theme modifiers"])){
                    modifiers.add(mod);
                }
            }
        }
    }
  
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
                    possibilities={modifiers} 
                    active_radio={active_modifier}
                    set_active_radio={set_active_modifier}/>
        </>
    )
  }
  
  export default PlayScreen
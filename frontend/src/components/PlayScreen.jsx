import { useState } from 'react';
import Picker from './Picker.jsx';
import ButtonPanel from './ButtonPanel.jsx';
import LoadingBar from './LoadingBar.jsx';
import { transition } from '../audio_manager.js';

function GetRegions(sound_lore){
    return Object.keys(sound_lore["regions"]);
}

function GetPlaces(sound_lore){
    return Object.keys(sound_lore["places"]);
}

function GetMusicContexts(sound_lore, active_place){
    var music_contexts = new Set();
    for (const music_con of Object.keys(sound_lore["music contexts"])){
        music_contexts.add(music_con);
    }
    for (const music_con of Object.keys(sound_lore["places"][active_place]["music contexts"])){
        music_contexts.add(music_con);
    }
    return Array.from(music_contexts);
}

function GetModifiers(sound_lore, active_place, active_music_context){
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
    return Array.from(modifiers);
}

function VerifyOptionPresence(active_option, set_active_option, options, default_option){
    if (!options.includes(active_option)){
        set_active_option(default_option);
    }
}

function GetTransitions(sound_lore){
    return Object.keys(sound_lore["transitions"]);
}

function PlayScreen() {
    const [active_region, set_active_region] = useState("default");
    const [active_place, set_active_place] = useState("default");
    const [active_music_context, set_active_music_context] = useState("main");
    const [active_modifier, set_active_modifier] = useState("no modifier");
    const [transition_progress, set_transition_progress] = useState(0);
    const [transition_time, set_transition_time] = useState(1);
    const [is_transitioning, set_is_transitioning] = useState(false);
    const [sound_lore, set_sound_lore] = useState(null);

    fetch('/sound_lore')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            set_sound_lore(data);});

    if(sound_lore==null){
        return (<h1>Loading</h1>);
    }

    const regions = GetRegions(sound_lore);
    const places = GetPlaces(sound_lore);
    const music_contexts = GetMusicContexts(sound_lore, active_place);
    const modifiers = GetModifiers(sound_lore, active_place, active_music_context);
    const transitions = GetTransitions(sound_lore);

    VerifyOptionPresence(active_music_context, set_active_music_context, music_contexts, "main");
    VerifyOptionPresence(active_modifier, set_active_modifier, modifiers, "no modifier");

    function DoTransition(transition_name){
        transition( active_region,
                    active_place,
                    active_music_context,
                    active_modifier,
                    sound_lore["transitions"][transition_name]);
        const t_time = sound_lore["transitions"][transition_name]["time"];
        set_transition_time(t_time/1000);
        set_transition_progress(100);
        set_is_transitioning(true);
        setTimeout(() => {
            set_transition_time(0);
            set_transition_progress(0);
            set_is_transitioning(false);
        }, t_time);
    }
  
    return (
        <>
            <h1>Play Screen</h1>
            <Picker name="Region" 
                    possibilities={regions} 
                    active_radio={active_region}
                    disabled={is_transitioning}
                    set_active_radio={set_active_region}/>
            <Picker name="Place" 
                    possibilities={places} 
                    active_radio={active_place}
                    disabled={is_transitioning}
                    set_active_radio={set_active_place}/>
            <Picker name="Music Context" 
                    possibilities={music_contexts} 
                    active_radio={active_music_context}
                    disabled={is_transitioning}
                    set_active_radio={set_active_music_context}/>
            <Picker name="Modifier" 
                    possibilities={modifiers} 
                    active_radio={active_modifier}
                    disabled={is_transitioning}
                    set_active_radio={set_active_modifier}/>
            <ButtonPanel    name="Transitions"
                            possibilities={transitions}
                            is_transitioning={is_transitioning}
                            additional_content={<LoadingBar progress_percentage={transition_progress} transition_time={transition_time}/>}
                            button_pressed_func={DoTransition}/>
        </>
    )
  }
  
  export default PlayScreen
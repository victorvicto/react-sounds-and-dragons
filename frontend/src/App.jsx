import { useState } from 'react';

import PlayScreen from './components/PlayScreen.jsx';
import SoundsScreen from './components/SoundsScreen.jsx';
import ThemesScreen from './components/ThemesScreen.jsx';
import TabLink from './components/TabLink.jsx';
import TabPane from './components/TabPane.jsx';
import audio_manager from './audio_manager.js';

function App() {
    const [active_tab_name, set_active_tab_name] = useState("Play Screen");
    const [sound_lore, set_sound_lore] = useState(null);

    if(sound_lore==null){
        fetch('http://localhost:5000/sound_lore')
        .then(response => {
            console.log(response);
            return response.json();})
        .then(data => {
            console.log(data);
            audio_manager.sound_lore = data;
            set_sound_lore(data);});
    }

    const tabs = {
        "Play Screen": <PlayScreen sound_lore={sound_lore}/>,
        "Sounds": <SoundsScreen sound_lore={sound_lore}/>,
        "Themes": <ThemesScreen sound_lore={sound_lore}/>
    };

    const tab_links = [];
    const tab_panes = [];

    for (const [tab_name, tab_content] of Object.entries(tabs)) {
        tab_links.push(<TabLink key={tab_name} name={ tab_name } active={ tab_name==active_tab_name } tab_setter={set_active_tab_name}/>);
        tab_panes.push(<TabPane key={tab_name} content={ tab_content } active={ tab_name==active_tab_name }/>);
    }

    return (
        <div className='card m-2 shadow'>
            <div className='card-header'>
                <nav>
                    <div className='nav nav-tabs card-header-tabs'>
                        {tab_links}
                    </div>
                </nav>
            </div>
            <div className='card-body'>
                <div className='tab-content'>
                    {tab_panes}
                </div>
            </div>
        </div>                  
    )
}

export default App

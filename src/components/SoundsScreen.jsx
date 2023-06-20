import SoundSection from './SoundSection';
import sound_lore from '../assets/sound_lore.json';

function SoundsScreen() {

    var sound_sections = []
    for(const [key, sound_info] of Object.entries(sound_lore["sounds"])){
        sound_sections.push(
            <SoundSection   key={key+'-sound'}
                            sound_name={key}
                            files={sound_info["files"]}
                            category={sound_info["quicksound category"]}/>
        )
    }
  
    return (
        <>
            <h1>Sounds</h1>
            <div>
                {sound_sections}
            </div>
        </>
    )
  }
  
  export default SoundsScreen
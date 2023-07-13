import SoundSection from './SoundSection';
// import sound_lore from '../assets/sound_lore.json';

function SoundsScreen({sound_lore}) {

    function modifySound(sound_name, new_sound){
        sound_lore["sounds"][sound_name] = new_sound;
        // TODO using DB?
    }

    if(sound_lore==null){
        return (<h1>Loading</h1>);
    }

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
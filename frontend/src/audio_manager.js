import {Howl, Howler} from 'howler';
//import sound_lore from './assets/sound_lore.json';

class AudioManager{

    constructor(sound_lore) {
        this.sound_lore = sound_lore;
        this.sound_howls = {}; // Each sound has an entry in the dict. In each entry is a dictionary with one howl per file
        this.theme_howl = null;
        this.old_theme_howl = null;
        this.theme_file_name = "";

        this.region = "default";
        this.place = "default";
        this.music_context = "main";
        this.modifier = "no modifier";
    }

    setControllerVariables(r, p, mc, m){
        this.region = r;
        this.place = p;
        this.music_context = mc;
        this.modifier = m;
    }

    get_final_file_url(file_name){
        console.log("the file_name received:");
        console.log(file_name);
        var sentence = "http://localhost:5000/files/"+file_name;
        console.log("final name: "+sentence);
        return sentence;
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    fade_out_sound(howl, fade_time, sound_name, file_name){
        if (howl == undefined){
            return;
        }
        howl.fade(howl.volume(), 0.0, fade_time);
        setTimeout(()=>{
            console.log("Unloading "+file_name+" in "+sound_name+" sound.");
            howl.unload();
            delete this.sound_howls[sound_name][file_name];
            if (Object.keys(this.sound_howls[sound_name]).length === 0){
                console.log("Sound "+sound_name+" has no more howls, deleting it.");
                delete this.sound_howls[sound_name];
            }
        }, fade_time);
    }

    fade_out_theme(howl, fade_time){
        if (howl == null){
            return;
        }
        howl.fade(howl.volume(), 0.0, fade_time);
        setTimeout(()=>{
            console.log("Unloading previous theme.");
            howl.unload();
        }, fade_time);
    }

    get_sound_file_name(sound_name){
        if (sound_name in this.sound_lore["regions"][this.region]["sounds override"]){
            return this.sound_lore["regions"][this.region]["sounds override"][sound_name]["files"][0]["file"];
        } else {
            return this.sound_lore["sounds"][sound_name]["files"][0]["file"];
        }
    }

    get_theme_file_name(theme_name){
        if (theme_name in this.sound_lore["regions"][this.region]["themes override"]){
            return this.sound_lore["regions"][this.region]["themes override"][theme_name][0]["file"];
        } else {
            return this.sound_lore["themes"][theme_name][0]["file"];
        }
    }

    get_theme_volume(theme_name){
        if (theme_name in this.sound_lore["regions"][this.region]["themes override"]){
            return this.sound_lore["regions"][this.region]["themes override"][theme_name][0]["volume"];
        } else {
            return this.sound_lore["themes"][theme_name][0]["volume"];
        }
    }

    get_required_theme(){
        var required_theme = this.sound_lore["music contexts"][this.music_context]["theme"];
        if (this.modifier in this.sound_lore["music contexts"][this.music_context]["theme modifiers"]){
            required_theme = this.sound_lore["music contexts"][this.music_context]["theme modifiers"][this.modifier]["theme"];
        }

        var places_to_check = [this.sound_lore["places"][this.place]];
        if (("places_override" in this.sound_lore["regions"][this.region]) && (this.place in this.sound_lore["regions"][this.region]["places_override"])){
            places_to_check.push(this.sound_lore["regions"][this.region]["places_override"][this.place]);
        }

        for(var p of places_to_check){
            if (this.music_context in p["music contexts"]){
                required_theme = p["music contexts"][this.music_context]["theme"];
                if (this.modifier in p["music contexts"][this.music_context]["theme modifiers"]){
                    required_theme = p["music contexts"][this.music_context]["theme modifiers"][this.modifier]["theme"];
                }
            }
        }
        return required_theme;
    }

    update_howl(howl, sound_name, sound_info){
        howl.off('end');
        howl.on('end', () => {
            let interval_time = this.getRandomArbitrary(sound_info["interval"][0], sound_info["interval"][1]);
            console.log(sound_name + " sound ended, setting timeout to play sound again in "+interval_time+" seconds.");
            setTimeout(() => {
                console.log("Timeout done, playing "+sound_name+" sound.");
                self.play();
            }, interval_time);
        });
    }

    new_sound_howl(sound_name, file_name, sound_info){
        return new Howl({
            src: [this.get_final_file_url(file_name)],
            volume: 0.0,
            html5: true,
            onend: () => {
                let interval_time = this.getRandomArbitrary(sound_info["interval"][0], sound_info["interval"][1]);
                console.log(sound_name + " sound ended, setting timeout for in "+interval_time+" seconds.");
                setTimeout(() => {
                    console.log("Timeout done, playing "+sound_name+" sound.");
                    self.play();
                }, interval_time);
            }
        });
    }

    // Faire en sorte que cette fonction autosupprime son howl non?
    play_punctual_sound(sound_name, volume){
        var file_name = this.get_sound_file_name(sound_name);
        this.play_punctual_sound_by_filename(file_name, volume)
    }

    play_punctual_sound_by_filename(file_name, volume){
        var howl = new Howl({
            src: [this.get_final_file_url(file_name)],
            volume: volume,
            onplay: ()=>{
                console.log(howl.duration());
                setTimeout(()=>{howl.unload()}, howl.duration()*1000);
            }
        });
        howl.play();
    }

    play_transition_sounds(transition_info){
        for (const [sound_to_play_name, sound_to_play_info] of Object.entries(transition_info["play"])){
            setTimeout(()=>{
                this.play_punctual_sound(sound_to_play_name, sound_to_play_info["volume"]);
            }, sound_to_play_info["timing"]);
        }
    }

    transition(r, p, mc, m, transition_info){
        this.play_transition_sounds(transition_info);
        this.setControllerVariables(r, p, mc, m);
        var transition_time = transition_info["time"];
        // GETTING RID OF SOUNDS NOT IN NEW AMBIENCE OR THAT DON'T HAVE THE SAME FILE
        for(const [sound_name, sound_howl_dict] of Object.entries(this.sound_howls)){
            var file_name = this.get_sound_file_name(sound_name);
            if (sound_name in this.sound_lore["places"][this.place]["ambiance"]){
                if (!(file_name in sound_howl_dict)){
                    this.fade_out_sound(sound_howl_dict[file_name], transition_time, sound_name, file_name);
                }
            } else {
                for (const [file_name_within, howl] of Object.entries(sound_howl_dict)){
                    this.fade_out_sound(howl, transition_time, sound_name, file_name_within);
                }
            }
        }

        // STARTING NEW SOUNDS
        // TODO pick a random sound in the array (not just first one)
        for (const [sound_name, sound_info] of Object.entries(this.sound_lore["places"][this.place]["ambiance"])){
            var file_name = this.get_sound_file_name(sound_name);
            if ((sound_name in this.sound_howls) && (file_name in this.sound_howls[sound_name])){
                this.update_howl(this.sound_howls[sound_name][file_name], sound_name, sound_info);
            } else {
                var new_howl = this.new_sound_howl(sound_name, file_name, sound_info);
                new_howl.fade(0.0, sound_info["volume"], transition_time);
                if (!(sound_name in this.sound_howls)){
                    this.sound_howls[sound_name] = {};
                }
                this.sound_howls[sound_name][file_name] = new_howl;
                setTimeout(()=>{
                    this.sound_howls[sound_name][file_name].play();
                }, sound_info["interval"][0]);
            }
        }

        // TRANSITIONING THEME IF NEEDED
        var required_theme = this.get_required_theme();
        var required_theme_file_name = this.get_theme_file_name(required_theme["name"]);
        var required_theme_volume = this.get_theme_volume(required_theme["name"]);
        if (this.theme_file_name != required_theme_file_name){
            this.old_theme_howl = this.theme_howl;
            this.theme_file_name = required_theme_file_name;
            this.theme_howl = new Howl({
                src: [this.get_final_file_url(this.theme_file_name)],
                loop: true,
                volume: 0.0,
                html5: true,
            });
            this.fade_out_theme(this.old_theme_howl, transition_time);
            this.theme_howl.play(); // TODO Start at random spot if required
            console.log("Fading "+this.theme_file_name+" from 0 to "+required_theme_volume+" in "+transition_time+" miliseconds");
            console.log(this.theme_howl);
            this.theme_howl.fade(0.0, required_theme_volume, transition_time);
        }
        console.log(this.theme_file_name);
    }

}

// var test_howl = new Howl({
//     src: ["musics/piano_loop.wav"],
//     volume: 1.0,
//     html5: true,
//     onend: () => {
//         let interval_time = 3;
//         setTimeout(() => {
//             self.play();
//         }, interval_time*1000);
//     }
// });

// function play(){
//     test_howl.play();
// }

// function pause(){
//     test_howl.pause();
// }

// function switch_songs(){
//     if (test_howl.src[0]=="musics/piano_loop.wav"){
//         test_howl.src = ["musics/bass_kick_loop.wav"];
//     } else {
//         test_howl.src = ["musics/piano_loop.wav"];
//     }
// }
var audio_manager = new AudioManager({});

export default audio_manager
function setVolumeProfile(file, set_profile) {
    // Create an AudioContext instance
    const audio_context = new (window.AudioContext || window.webkitAudioContext)();
    const audio_url = "/"+file["file"];
    var final_profile = []
  
    // Fetch the audio file
    fetch(audio_url)
        .then(response => response.arrayBuffer())
        .then(array_buffer => audio_context.decodeAudioData(array_buffer))
        .then(audio_buffer => {
            // Get the audio data from the buffer
            const audio_data = audio_buffer.getChannelData(0); // Assuming mono audio
            const delta_samp = audio_data.length/101.0;
            var highest = 0
            for(var i=1;i<=100;i++){
                const samp = Math.abs(audio_data[Math.round(i*delta_samp)]);
                final_profile.push(samp);
                if (samp>highest){
                    highest = samp;
                }

            }
            set_profile(final_profile);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export default setVolumeProfile
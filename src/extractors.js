function getVolumeProfile(audio_url) {
    // Create an AudioContext instance
    const audio_context = new (window.AudioContext || window.webkitAudioContext)();
    var final_profile = []
  
    // Fetch the audio file
    fetch(audio_url)
        .then(response => response.arrayBuffer())
        .then(array_buffer => audio_context.decodeAudioData(array_buffer))
        .then(audio_buffer => {
            // Get the audio data from the buffer
            const audio_data = audio_buffer.getChannelData(0); // Assuming mono audio
            const delta_samp = audio_data.length/101.0;
    
            for(var i=1;i<=100;i++){
                final_profile.push(audio_data[i*delta_samp]);
            }
            return final_profile;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export default getVolumeProfile
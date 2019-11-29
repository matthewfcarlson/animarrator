
import Meyda from "meyda";
export class SoundEngine {
    private audioBuffer: AudioBuffer | null = null;
    private audioSource: AudioBufferSourceNode | null = null;

    private static audioCtx: AudioContext = (new (window as any).AudioContext()) || (window as any).webkitAudioContext || null;
    private playing = false;
    private saved_time = 0;

    /**
     * Loads a sound in
     * @param blob 
     */
    public async LoadSound(blob: ArrayBuffer): Promise<number[]> {
        this.audioBuffer = await SoundEngine.audioCtx.decodeAudioData(blob);
        // Finds silence sections in audio and splits it
        const section_starts = SoundEngine.SegmentSound(this.audioBuffer);
        console.log(section_starts);
        // Gets text to speech for the audio (if enabled)
        // returns the sections that we found
        return section_starts
    }

    /**
     * Analyzes a sound
     * @param audio the audio buffer
     * @returns a list of section starts in milliseconds
     */
    private static SegmentSound(audio: AudioBuffer): number[] {

        const bufferSize = 64;
        Meyda.bufferSize = bufferSize;
        const buffers_per_second = audio.sampleRate / bufferSize;

        // chunk the audio up into 512 btye samples
        const rms_buffer = new Float32Array(audio.length / bufferSize)
        for (var index = 0; index < audio.length; index += bufferSize) {
            const temp = new Float32Array(bufferSize);
            for (var channel = 0; channel < audio.numberOfChannels; channel += 1) {
                audio.copyFromChannel(temp, channel, index);
                const features = Meyda.extract(['rms'], temp);
                rms_buffer[index / bufferSize] = features["rms"];
            }
        }
        const max = rms_buffer.reduce((a, b) => a > b ? a : b, -Infinity);
        const min = rms_buffer.reduce((a, b) => a < b ? a : b, Infinity);
        const avg = rms_buffer.reduce((a, b) => a + b, 0) / rms_buffer.length
        console.log(max, min, avg);
        //console.log(rms_buffer);
        let prev_rms = 0;
        let last_section = 0;
        const upper_threshold = avg * 1.5;
        const lower_threshold = avg * 0.75;
        let section_starts = [];
        const minim_section_length = buffers_per_second / 5; //at least 1/5th of a second
        console.log("Finding sections of at least ", minim_section_length);
        let talking = false;
        let rms_results = []
        for (var i = 0; i < rms_buffer.length; i++) {
            const rms = rms_buffer[i];
            prev_rms *= 0.9;

            const curr_rms = prev_rms + rms;
            if (i - last_section > minim_section_length) {
                if (curr_rms > upper_threshold && !talking) {
                    section_starts.push(i);
                    last_section = i;
                    talking = true;
                }
                else if (curr_rms < lower_threshold && talking) {
                    // how to detect silence?
                    talking = false;
                }
            }
            rms_results.push(curr_rms);
            prev_rms = curr_rms;
        }
        //console.log(rms_results);
        console.log(section_starts);
        const buffers_per_ms = 1000 / audio.sampleRate * bufferSize;
        console.log("Buffers per MS", buffers_per_ms)
        const section_start_time_ms = section_starts.map(x => x / buffers_per_ms);

        //we need to return the sample index of the
        return section_start_time_ms;
    }

    /**
     * Returns the duration of the current music in seconds
     */
    public get duration() {
        if (this.audioBuffer == null) {
            return 0;
        }
        return this.audioBuffer.duration;
    }

    public Play(): boolean {
        if (this.audioSource != null || this.audioBuffer == null) {
            return false;
        }
        this.audioSource = SoundEngine.audioCtx.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;
        this.audioSource.onended = this.Stop;
        this.audioSource.connect(SoundEngine.audioCtx.destination);
        this.audioSource.start(0, this.saved_time); //start right away with an offset
        console.log("Starting playback with offet", this.saved_time);
        this.playing = true;
        return true;
    }

    public Reset() {
        this.Stop();
        this.audioBuffer = null;
    }

    public Pause(): boolean {
        if (this.audioSource == null || this.audioBuffer == null) {
            return false;
        }
        if (!this.playing) {
            return false;
        }
        // how to save the current audio source?
        const current_time = 5;
        this.Stop();
        this.saved_time = current_time;
        return true;
    }
    public Stop(): boolean {
        if (this.audioSource == null || this.audioBuffer == null) {
            return false;
        }
        if (this.playing) {
            this.audioSource.stop();
        }
        else {
            return false;
        }
        this.audioSource = null;
        this.saved_time = 0;
        this.playing = false;
        return true;
    }

    /**
     * 
     * @param ms the point to seek to in milliseconds
     */
    public Seek(ms: number): boolean {
        if (this.audioSource == null || this.audioBuffer == null) {
            return false;
        }
        if (ms >= (this.audioBuffer.duration * 1000)) {
            return false;
        }
        if (this.playing) {
            this.Stop();
            this.saved_time = ms;
            this.Play();
        }
        else {
            this.saved_time = ms;
        }
        console.log("seeked to ", this.saved_time);

        return true;
    }
}
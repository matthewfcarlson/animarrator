import { Serializable } from "../storage";

export class SoundEngine implements Serializable {
    private audioBuffer: AudioBuffer | null = null;
    private audioSource: AudioBufferSourceNode | null = null;

    private static audioCtx: AudioContext = (new (window as any).AudioContext()) ||  (window as any).webkitAudioContext || null;
    private playing = false;
    private saved_time = 0;

    public async LoadSound(blob: ArrayBuffer): Promise<number[]>{
        this.audioBuffer = await SoundEngine.audioCtx.decodeAudioData(blob);
        // Finds silence sections in audio and splits it
        // Gets text to speech for the audio (if enabled)
        // returns the sections that we found
        return []
    }

    /**
     * Returns the duration of the current music
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
        if (this.playing){
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
    //S
    Load(_str: string): boolean {
        throw new Error("Method not implemented.");
    }
    Save(): string {
        throw new Error("Method not implemented.");
    }
}

export class SoundEngine {
    private audioBuffer: AudioBuffer | null = null;
    private audioSource: AudioBufferSourceNode | null = null;

    private static audioCtx: AudioContext = (new (window as any).AudioContext()) || null;

    public async LoadSound(blob: ArrayBuffer): Promise<number[]>{
        this.audioBuffer = await SoundEngine.audioCtx.decodeAudioData(blob);
        this.audioSource = SoundEngine.audioCtx.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;
        this.audioSource.connect(SoundEngine.audioCtx.destination);
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
        return this.audioBuffer.length;
    }

    public Play(): boolean {
        if (this.audioSource == null) {
            return false;
        }
        this.audioSource.start();
        return true;
    }

    public Reset() {
        this.Stop();
        this.audioBuffer = null;
    }

    public Pause(): boolean {
        if (this.audioSource == null) {
            return false;
        }
        // how to save the current audio source?
        this.audioSource.stop();
        return true;
    }
    public Stop(): boolean {
        if (this.audioSource == null) {
            return false;
        }
        this.audioSource.stop();
        return true;
    }

    public Seek(index: number): boolean {
        if (this.audioSource == null) {
            return false;
        }
        console.log(index);
        //this.audioSource.seek(index);
        return true;
    }
}
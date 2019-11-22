/** 
 * Handles requesting animation frames
 * TODO: Does this also handle global state?
 */

import AnimationFrame from 'animation-frame';
//const debug = process.env.NODE_ENV !== 'production';

export class AnimationDirector {
    private animateFrameId!: number | null;
    private frameLength!: number;
    private animationFrame!: AnimationFrame | null;
    private frameRate!: number; // For now frame rate is hard coded? Should be: 24, 25, 30, 48, 50, 60
    private frameNumber!: number;
    private splits: number[] = []; // the frame numbers that we split at (split starts at that frame)
    private playing!: boolean;
    private audio!: AudioBuffer | null;
    //private startRequestTime = 0;

    private static _instance: AnimationDirector;
    private static audioCtx: AudioContext = (new (window as any).AudioContext()) || null;

    private constructor() {
        this.Reset();
        
    }

    public static get Instance() {
        const inst = this._instance || (this._instance = new this());
        return inst;
    }

    // returns the current time of playback in milliseconds
    public get CurrentScrubTime() {
        return this.frameNumber * 1000 / this.frameRate;
    }

    // returns the maximum playback time
    public get MaxScrubTime() {
        return this.frameLength * 1000 / this.frameRate;
    }

    public get CurrentScene() {
        // TODO calculate what scene we are in?
        return 1;
    }

    public get MaxScenes() {
        // If there's nothing in this 
        return this.splits.length + 1;
    }

    public static Import() {
        // imports a particular project
        this.Instance.Reset();
    }

    private Reset() {
        // Resets the director back to a known good state
        this.frameNumber = 0;
        this.animationFrame = null;
        this.frameLength = 0;
        this.frameRate = 30;
        this.playing = false;
        this.animateFrameId = null;
        this.audio = null;
        this.splits.splice(0, this.splits.length); // remove all the elements in the array
    }

    public static async LoadAudio(blob: ArrayBuffer) {
        // Loads Audio into the project
        this.Instance.Reset();
        console.log(blob);
        console.log(typeof (blob));
        const data = await this.audioCtx.decodeAudioData(blob);
        console.log(data);
        this.Instance.audio = data;

        // Figures out the number of frames given the frame rate
        this.Instance.frameLength = data.duration * this.Instance.frameRate;
        console.log("Duration ", data.duration);
        console.log("Frames ", data.duration * this.Instance.frameRate);
        console.log("FrameRate ", this.Instance.frameRate);
        console.log("Frames ", this.Instance.frameLength);

        // Gets text to speech for the audio (if enabled)
        // Finds silence sections in audio and splits it

    }

    private Animate() {
        var self = this;
        this.animateFrameId = this.animationFrame!.request((time) => {
            self.Frame(time);
            if (self.playing && self.frameNumber < self.frameLength) self.Animate();
        });
    }

    public get isPlaying() {
        return this.playing;
    }

    /**
     * The call back for each animation frame
     * @param time 
     */
    private Frame(time: any) {
        //Figure out how to handle pauses and stops?
        console.log("Frame time:" + time, "Frame number: " + this.frameNumber);
        //TODO how to signal other parts of system to tick forward at appropriate rate?
        this.frameNumber++;
    }

    public Play() {
        if (this.animationFrame == null) this.animationFrame = new AnimationFrame(this.frameRate);
        this.playing = true;
        console.log(this.audio);
        // TODO somehow figure out how to play the audio?
        this.Animate();
    }

    /**
     * Pauses the animation but does not reset the frame number
     */
    public Pause() {
        if (this.animateFrameId != null && this.animationFrame != null) this.animationFrame.cancel(this.animateFrameId);
    }

    /**
     * Stops the animation and resets the frame number
     */
    public Stop() {
        this.Pause();
        this.frameNumber = 0;
    }

    public PrevSection() {
        throw new Error("Method not implemented.");
    }
    public NextSection() {
        throw new Error("Method not implemented.");
    }
}
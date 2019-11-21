/** 
 * Handles requesting animation frames
 * TODO: Does this also handle global state?
 */

import AnimationFrame from 'animation-frame';
//const debug = process.env.NODE_ENV !== 'production';

export class AnimationDirector {
    private animateFrameId!: number | null;
    private frameLength!: Number;
    private animationFrame!: AnimationFrame | null;
    private frameRate!: number; // For now frame rate is hard coded? Should be: 24, 25, 30, 48, 50, 60
    private frameNumber!: number;
    private playing!: boolean;
    //private startRequestTime = 0;

    private static _instance: AnimationDirector;

    private constructor() {
        this.Reset();
    }

    public static get Instance() {
        const inst = this._instance || (this._instance = new this());
        inst.Reset()
        return inst;
    }

    public static Import(){
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
    }

    public static LoadAudio(){
        // Loads Audio into the project
        this.Instance.Reset();
        // Figures out the number of frames given the frame rate
        // Gets text to speech for the audio (if enabled)
        // Finds silence sections in audio and splits it

    }

    public Play() {
        if (this.animationFrame == null) this.animationFrame = new AnimationFrame(this.frameRate);
        this.playing = true;
        this.Animate();
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
        console.log("Frame time:" + time, "Frame number: "+ this.frameNumber);
        //TODO how to signal other parts of system to tick forward at appropriate rate?
        this.frameNumber++;
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
}
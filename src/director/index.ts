/** 
 * Handles requesting animation frames
 * TODO: Does this also handle global state?
 */

import AnimationFrame from 'animation-frame';
import { SoundEngine } from '../sound';
import VisbilityManager from './visibility';
//const debug = process.env.NODE_ENV !== 'production';

export class AnimationDirector {
    private animateFrameId!: number | null;
    private frameLength!: number;
    private animationFrame!: AnimationFrame | null;
    private frameRate!: number; // For now frame rate is hard coded? Should be: 24, 25, 30, 48, 50, 60
    private frameNumber!: number;
    private splits: number[] = []; // the frame numbers that we split at (split starts at that frame)
    private playing!: boolean;
    private audio: SoundEngine;
    //private startRequestTime = 0;

    private static _instance: AnimationDirector;
    
    private constructor() {
        this.Reset();
        this.audio = new SoundEngine();

        //Visibility stuff
        VisbilityManager.Notify("hide", (_args: any[]) => {
            AnimationDirector.Instance.Pause() // we should pause
        });
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
        var scene = 1;
        for (var i=0; i < this.splits.length; i++){
            const split = this.splits[i];
            if (split > this.frameNumber) return scene;
            else scene = i+2;
        }
        return scene;
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
        this.splits.splice(0, this.splits.length); // remove all the elements in the array
    }

    public static async LoadAudio(blob: ArrayBuffer) {
        // Loads Audio into the project
        this.Instance.Reset();

        // Figures out the number of frames given the frame rate
        const splits_ms = await this.Instance.audio.LoadSound(blob);
        const audioDuration = this.Instance.audio.duration;
        this.Instance.frameLength = audioDuration * this.Instance.frameRate;
        const frame_rate = this.Instance.frameRate;
        // we need to convert millisecond times into frame numbers
        const splits = splits_ms.map(x => Math.round(x * frame_rate / 1000));
        console.log(splits);
        this.Instance.splits.concat(splits);
        console.log("Duration ", audioDuration);
        console.log("Frames ", audioDuration * this.Instance.frameRate);
        console.log("FrameRate ", this.Instance.frameRate);
        console.log("Frames ", this.Instance.frameLength);
        console.log("Splits ", this.Instance.splits);

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
    private Frame(_time: any) {
        //Figure out how to handle pauses and stops?
        //console.log("Frame time:" + time, "Frame number: " + this.frameNumber);
        //TODO how to signal other parts of system to tick forward at appropriate rate?
        this.frameNumber++;
    }

    public Play() {
        if (this.animationFrame == null) this.animationFrame = new AnimationFrame(this.frameRate);
        this.playing = true;
        console.log(this.audio);
        this.audio.Play();
        // TODO somehow figure out how to play the audio?
        this.Animate();
    }

    /**
     * Pauses the animation but does not reset the frame number
     */
    public Pause() {
        if (this.animateFrameId != null && this.animationFrame != null) this.animationFrame.cancel(this.animateFrameId);
        this.playing = false;
        this.audio.Pause();
    }

    /**
     * Stops the animation and resets the frame number
     */
    public Stop() {
        this.Pause();
        this.audio.Stop();
        this.frameNumber = 0;
    }

    public Split() {
        const split = this.frameNumber;
        if (this.splits.indexOf(split) != -1) return; // We can't add a split that already exists?
        this.splits.push(this.frameNumber);
        this.splits = this.splits.sort((a, b) => a - b);
        console.log(this.splits);
    }

    public PrevSection() {
        throw new Error("Method not implemented.");
    }
    public NextSection() {
        throw new Error("Method not implemented.");
    }
}
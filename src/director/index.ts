/** 
 * Handles requesting animation frames
 * TODO: Does this also handle global state?
 */

import Vuex from 'vuex'
import createLogger from './store_logger';
import AnimationFrame from 'animation-frame';
import Vue from 'vue';


const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export class AnimationDirector {
    private frameId: number | null = 0;
    private frameLength = 5000;
    private animationFrame: AnimationFrame | null = null;
    private frameRate = 30;
    private _frameNumber = 0;
    private _scrubTime = 0;
    private playing = false;
    //private startRequestTime = 0;

    private static _instance: AnimationDirector;

    private constructor() {
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public Play() {
        if (this.animationFrame == null) this.animationFrame = new AnimationFrame(this.frameRate);
        this.playing = true;
        this.Animate();
    }

    private Animate() {
        var self = this;
        this.frameId = this.animationFrame!.request((time) => {
            self.Frame(time);
            if (self.playing && self._frameNumber < self.frameLength) self.Animate();
        });
    }

    public get frameNumber() {
        return this._frameNumber;
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
        console.log("Frame time:" + time, "Scrub time: "+ this._scrubTime, "Frame number: "+ this._frameNumber);
        //TODO how to signal other parts of system to tick forward at appropriate rate?
        this._frameNumber++;
        //TODO how to use time we are getting- we'll need to keep track of how long it has been?
        this._scrubTime = this.frameNumber / this.frameRate;
    }

    /**
     * Pauses the animation but does not reset the frame number
     */
    public Pause() {
        if (this.frameId != null && this.animationFrame != null) this.animationFrame.cancel(this.frameId);
    }

    /**
     * Stops the animation and resets the frame number
     */
    public Stop() {
        this.Pause();
        this._frameNumber = 0;
        this._scrubTime = 0;
    }
}

const Store = new Vuex.Store({
    modules: {
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});

export { Store };
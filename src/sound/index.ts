import {Howl} from 'howler';

export class SoundEngine {
    current_audio:Howl|null = null;

    public LoadSound(sound:string){
        this.current_audio = new Howl({
            src: [sound]
        });
    }

    public Play(): boolean {
        if (this.current_audio == null) {
            return false;
        }
        if (this.current_audio.playing()) {
            return false;
        }
        this.current_audio.play();
        return true;
    }

    public Pause(): boolean {
        if (this.current_audio == null) {
            return false;
        }
        if (!this.current_audio.playing()) {
            return false;
        }
        this.current_audio.pause();
        return true;
    }
    public Stop(): boolean {
        if (this.current_audio == null) {
            return false;
        }
        if (!this.current_audio.playing()) {
            return false;
        }
        this.current_audio.stop();
        return true;
    }

    public Seek(index: number): boolean {
        if (this.current_audio == null) {
            return false;
        }
        this.current_audio.seek(index);
        return true;
    }
}
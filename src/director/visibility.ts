import EventEmitter from "events";

export default class VisbilityManager {
    private static hidden: string | null = null;
    private static change: string | null = null;
    private static supported = false;
    private static setup = false;
    private static shimvis = true
    private static EventEmitter = new EventEmitter();

    private static Setup() {
        if (this.setup) return;

        if (typeof document.hidden !== 'undefined') {
            VisbilityManager.hidden = 'hidden'
            VisbilityManager.change = 'visibilitychange'
        }
        else if (typeof (document as any).mozHidden !== 'undefined') {
            VisbilityManager.hidden = 'mozHidden'
            VisbilityManager.change = 'mozvisibilitychange'
        } else if (typeof (document as any).webkitHidden !== 'undefined') {
            VisbilityManager.hidden = 'webkitHidden'
            VisbilityManager.change = 'webkitvisibilitychange'
        } else if (typeof (document as any).webkitHidden !== 'undefined') {
            VisbilityManager.hidden = 'webkitHidden'
            VisbilityManager.change = 'webkitvisibilitychange'
        }
        this.supported = !!this.hidden;
        if (this.supported && this.change != null) {
            document.addEventListener(this.change, function () {
                var visible = !(document as any)[(VisbilityManager.hidden as string)]
                VisbilityManager.Emit('change', visible)
                VisbilityManager.Emit(visible ? 'show' : 'hide')
            });
        }
        else {
            document.addEventListener('focusout', function () {
                VisbilityManager.Emit('change', false);
                VisbilityManager.Emit('hide');
                VisbilityManager.shimvis = false;
            }, false)
            document.addEventListener('focusin', function () {
                VisbilityManager.Emit('change', true);
                VisbilityManager.Emit('show');
                VisbilityManager.shimvis = true;
            }, false)
        }
        window.addEventListener('unload', function () {
            VisbilityManager.Emit('exit');
        }, false)
        this.setup = true;
    }

    private static Emit(event: string, value?: any) {
        this.EventEmitter.emit(event, [value]);
    }

    public static Notify(event: string, callback:((...args:any[]) => void)) {
        if (!this.setup) {
            this.Setup();
        }
        this.EventEmitter.addListener(event, callback);
    }

    static get isHidden() {
        if (this.hidden == null) {
            return this.shimvis;
        }
        return this.supported ? !!(document as any)[this.hidden] : !this.shimvis
    }

    static get isVisible() {
        if (this.hidden == null) {
            return this.shimvis;
        }
        return this.supported ? !(document as any)[this.hidden] : this.shimvis
    }



}
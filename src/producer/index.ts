export class MovieSettings {
    public width = 1920;
    public height = 1080;
    public fps = 24;
}
export class MovieData {
    public audio: string = "";
}

export async function CreateMovie(data:any, settings:MovieSettings){
    //console.log(data);
    data.audio = null;
    settings.width += 1;
    //console.log(settings);
}
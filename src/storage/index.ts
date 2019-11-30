import { AnimationDirector } from "../director";

/**
 * All objects should implement this
 */
export interface Serializable {
    /**
     * Loads the object itself from json
     * @param str the json string that it should load in
     */
    Load(str: string): boolean;
    /**
     * Saves the object into a json blob
     * @returns a json string to save
     */
    Save (): string;
}

/**
 * The interface for a project listing stored in storage
 */
export interface ProjectListing {
    name: string,
    id: string,
    duration: number // the number of seconds for this particular
}

/**
 * This handles storage of projects
 * Abstracts away all the different methods of storage?
 */
export class StorageEngine {
    static get projectList () {
        let projects: ProjectListing[] = [];
        projects.push(StorageEngine.CreateProjectListing("test"));
        return projects;
    }

    static SaveProject(_proj: ProjectListing):boolean {
        // Serialize the director into local storage?
        // TODO incorporate remote storage to support google drive, dropbox, etc.
        // Use project listing
        const contents = AnimationDirector.Instance.Save();
        console.log(contents);
        return false;
    }

    static ImportProject(_data:string): boolean {
        return false;
    }

    static LoadProject(_id:string): boolean {
        const test = "";
        return AnimationDirector.Instance.Load(test);
    }

    static CreateProjectListing(name: string): ProjectListing {
        return {
            name: name,
            id: "TEST", //TODO guid generation?
            duration: -1
        };
    }
}
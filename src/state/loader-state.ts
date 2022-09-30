import { makeAutoObservable } from "mobx"

export class Loader {

    loadingState: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    setLoadingState(turn: boolean) {
            this.loadingState = turn;
    }


}

export default Loader;
import { Vue } from 'vue-property-decorator';
export default class Canvas extends Vue {
    height: string;
    ratio: number;
    drawing: boolean;
    current_line: Number[];
    mounted(): void;
    windowResized(): void;
    movedHandler(event: MouseEvent | TouchEvent): void;
    movingHandler(event: MouseEvent | TouchEvent): void;
    startHandler(event: MouseEvent | TouchEvent): void;
    endHandler(event: MouseEvent | TouchEvent): void;
}

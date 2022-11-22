import { Instruction } from "../../Instruction";

export class impdep2 extends Instruction {
    length = 1
    public override execute(): void {
        return
    }
    public override toString(): string {
        return 'impdep2'
    }
}
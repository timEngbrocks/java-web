import { Instruction } from "../../Instruction";

export class breakpoint extends Instruction {
    length = 1
    public override execute(): void {
        return
    }
    public override toString(): string {
        return 'breakpoint'
    }
}
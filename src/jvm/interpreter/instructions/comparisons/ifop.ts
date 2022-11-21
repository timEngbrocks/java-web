import { Instruction } from "../../Instruction";
import { Runtime } from "../../Runtime";

export enum IfOps {
    eq = <any>'eq',
    ne = <any>'ne',
    lt = <any>'lt',
    ge = <any>'ge',
    gt = <any>'gt',
    le = <any>'le'
}

class ifop extends Instruction {
    length = 3
    args: string = ""
    constructor(private op: IfOps) {
        super()
    }
    public override setArgs(args: string): void {
        this.args = args
    }
    public override execute(): void {
        const value = Runtime.pop().get()
        let success = false
        switch (this.op) {
            case IfOps.eq: {
                success = value == 0
                break
            }
            case IfOps.ne: {
                success = value != 0
                break
            }
            case IfOps.lt: {
                success = value < 0
                break
            }
            case IfOps.ge: {
                success = value >= 0
                break
            }
            case IfOps.gt: {
                success = value > 0
                break
            }
            case IfOps.le: {
                success = value <= 0
                break
            }
        }
        if (success) {
            const branchbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
            const branchbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
            const offset = (branchbyte1 << 8) | branchbyte2
            Runtime.jumpByOffset(offset)
        }
    }
    public override toString(): string {
        const branchbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
        const branchbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
        const offset = (branchbyte1 << 8) | branchbyte2
        return `if${IfOps[this.op]} @ ${offset}`
    }
}

export const ifeq = new ifop(IfOps.eq)
export const ifne = new ifop(IfOps.ne)
export const iflt = new ifop(IfOps.lt)
export const ifge = new ifop(IfOps.ge)
export const ifgt = new ifop(IfOps.gt)
export const ifle = new ifop(IfOps.le)
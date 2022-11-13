import { CPInfo } from "../../types/CPInfo";

export class ConstantPool {

    constants: CPInfo<any>[]

    constructor(constants: CPInfo<any>[]) {
        this.constants = constants
    }

    public get(index: number): CPInfo<any> {
        return this.constants[index]
    }

}
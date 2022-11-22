import { JTypeData } from "../JType";

export interface ConstantValueData extends JTypeData {
    tag: number
    value: number | bigint
}
import { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { int } from '../../data-types/int'
import { Runtime } from '../../Runtime'
import { constructArrayFromArrayClassName } from '../../util/util'
import { Instruction } from '../Instruction'

export class anewarray extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const count = Runtime.it().pop() as int
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const componentType = Runtime.it().constant(index) as ConstantClass
		const className = (Runtime.it().constant(componentType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const array = constructArrayFromArrayClassName(className, count.get() as number)
		Runtime.it().push(Runtime.it().allocate(array))
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const componentType = Runtime.it().constant(index) as ConstantClass
		const className = (Runtime.it().constant(componentType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `anewarray ${className}`
	}
}

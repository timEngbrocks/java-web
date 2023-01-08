import type { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import type { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import type { int } from '../../data-types/int'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { constructArrayFromArrayClassName } from '../../util/util'
import { Instruction } from '../Instruction'

export class anewarray extends Instruction {
	override length = 3
	override args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const count = RuntimeManager.it().pop() as int
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const componentType = RuntimeManager.it().constant(index) as ConstantClass
		const className = (RuntimeManager.it().constant(componentType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const array = constructArrayFromArrayClassName(className, count.get() as number)
		RuntimeManager.it().push(RuntimeManager.it().allocate(array))
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const componentType = RuntimeManager.it().constant(index) as ConstantClass
		const className = (RuntimeManager.it().constant(componentType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `anewarray ${className}`
	}
}

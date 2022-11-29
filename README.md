# java-web

A runtime environment for Java based on TypeScript.

## Instruction Overview

> Total Implemented: 189/204 (92.6%)

> Total Tested: 56/204 (27.4%)

| OpCode | Name | Implemented | Tested |
| -- | -- | -- | -- |
| 0x00 | nop | x | x |
| 0x01 | aconst_null | x | - |
| 0x02 | iconst_m1 | x | - |
| 0x03 | iconst_0 | x | x |
| 0x04 | iconst_1 | x | x |
| 0x05 | iconst_2 | x | x |
| 0x06 | iconst_3 | x | - |
| 0x07 | iconst_4 | x | - |
| 0x08 | iconst_5 | x | - |
| 0x09 | lconst_0 | x | - |
| 0x0a | lconst_1 | x | x |
| 0x0b | fconst_0 | x | - |
| 0x0c | fconst_1 | x | x |
| 0x0d | fconst_2 | x | x |
| 0x0e | dconst_0 | x | - |
| 0x0f | dconst_1 | x | x |
| 0x10 | bipush | x | - |
| 0x11 | sipush | x | - |
| 0x12 | ldc | x | - |
| 0x13 | ldc_w | x | - |
| 0x14 | ldc2_w | x | x |
| 0x15 | iload | x | x |
| 0x16 | lload | x | x |
| 0x17 | fload | x | x |
| 0x18 | dload | x | x |
| 0x19 | aload | x | - |
| 0x1a | iload_0 | x | x |
| 0x1b | iload_1 | x | x |
| 0x1c | iload_2 | x | x |
| 0x1d | iload_3 | x | - |
| 0x1e | lload_0 | x | - |
| 0x1f | lload_1 | x | - |
| 0x20 | lload_2 | x | - |
| 0x21 | lload_3 | x | x |
| 0x22 | fload_0 | x | - |
| 0x23 | fload_1 | x | - |
| 0x24 | fload_2 | x | - |
| 0x25 | fload_3 | x | - |
| 0x26 | dload_0 | x | - |
| 0x27 | dload_1 | x | - |
| 0x28 | dload_2 | x | - |
| 0x29 | dload_3 | x | - |
| 0x2a | aload_0 | x | x |
| 0x2b | aload_1 | x | x |
| 0x2c | aload_2 | x | - |
| 0x2d | aload_3 | x | - |
| 0x2e | iaload | x | - |
| 0x2f | laload | x | - |
| 0x30 | faload | x | - |
| 0x31 | daload | x | - |
| 0x32 | aaload | x | - |
| 0x33 | baload | x | - |
| 0x34 | caload | x | - |
| 0x35 | saload | x | - |
| 0x36 | istore | x | x |
| 0x37 | lstore | x | x |
| 0x38 | fstore | x | x |
| 0x39 | dstore | x | x |
| 0x3a | astore | x | - |
| 0x3b | istore_0 | x | - |
| 0x3c | istore_1 | x | x |
| 0x3d | istore_2 | x | x |
| 0x3e | istore_3 | x | x |
| 0x3f | lstore_0 | x | - |
| 0x40 | lstore_1 | x | - |
| 0x41 | lstore_2 | x | - |
| 0x42 | lstore_3 | x | - |
| 0x43 | fstore_0 | x | - |
| 0x44 | fstore_1 | x | - |
| 0x45 | fstore_2 | x | - |
| 0x46 | fstore_3 | x | - |
| 0x47 | dstore_0 | x | - |
| 0x48 | dstore_1 | x | - |
| 0x49 | dstore_2 | x | - |
| 0x4a | dstore_3 | x | - |
| 0x4b | astore_0 | x | - |
| 0x4c | astore_1 | x | x |
| 0x4d | astore_2 | x | - |
| 0x4e | astore_3 | x | - |
| 0x4f | iastore | x | - |
| 0x50 | lastore | x | - |
| 0x51 | fastore | x | - |
| 0x52 | dastore | x | - |
| 0x53 | aastore | x | - |
| 0x54 | bastore | x | - |
| 0x55 | castore | x | - |
| 0x56 | sastore | x | - |
| 0x57 | pop | x | - |
| 0x58 | pop2 | x | - |
| 0x59 | dup | x | x |
| 0x5a | dup_x1 | x | - |
| 0x5b | dup_x2 | x | - |
| 0x5c | dup2 | x | - |
| 0x5d | dup2_x1 | x | - |
| 0x5e | dup2_x2 | x | - |
| 0x5f | swap | x | - |
| 0x60 | iadd | x | x |
| 0x61 | ladd | x | x |
| 0x62 | fadd | x | x |
| 0x63 | dadd | x | x |
| 0x64 | isub | x | x |
| 0x65 | lsub | x | x |
| 0x66 | fsub | x | x |
| 0x67 | dsub | x | x |
| 0x68 | imul | x | x |
| 0x69 | lmul | x | x |
| 0x6a | fmul | x | x |
| 0x6b | dmul | x | x |
| 0x6c | idiv | x | x |
| 0x6d | ldiv | x | x |
| 0x6e | fdiv | x | x |
| 0x6f | ddiv | x | x |
| 0x70 | irem | x | - |
| 0x71 | lrem | x | - |
| 0x72 | frem | x | - |
| 0x73 | drem | x | - |
| 0x74 | ineg | x | - |
| 0x75 | lneg | x | - |
| 0x76 | fneg | x | - |
| 0x77 | dneg | x | - |
| 0x78 | ishl | x | - |
| 0x79 | lshl | x | - |
| 0x7a | ishr | x | - |
| 0x7b | lshr | x | - |
| 0x7c | iushr | x | - |
| 0x7d | lushr | x | - |
| 0x7e | iand | x | - |
| 0x7f | land | x | - |
| 0x80 | ior | x | - |
| 0x81 | lor | x | - |
| 0x82 | ixor | x | - |
| 0x83 | lxor | x | - |
| 0x84 | iinc | x | - |
| 0x85 | i2l | x | - |
| 0x86 | i2f | x | - |
| 0x87 | i2d | x | - |
| 0x88 | l2i | x | - |
| 0x89 | l2f | x | - |
| 0x8a | l2d | x | - |
| 0x8b | f2i | x | - |
| 0x8c | f2l | x | - |
| 0x8d | f2d | x | - |
| 0x8e | d2i | x | - |
| 0x8f | d2l | x | - |
| 0x90 | d2f | x | - |
| 0x91 | i2b | x | - |
| 0x92 | i2c | x | - |
| 0x93 | i2s | x | - |
| 0x94 | lcmp | x | - |
| 0x95 | fcmpl | x | - |
| 0x96 | fcmpg | x | - |
| 0x97 | dcmpl | x | - |
| 0x98 | dcmpg | x | - |
| 0x99 | ifeq | x | - |
| 0x9a | ifne | x | - |
| 0x9b | iflt | x | - |
| 0x9c | ifge | x | - |
| 0x9d | ifgt | x | - |
| 0x9e | ifle | x | - |
| 0x9f | if_icmpeq | x | x |
| 0xa0 | if_icmpne | x | x |
| 0xa1 | if_icmplt | x | x |
| 0xa2 | if_icmpge | x | x |
| 0xa3 | if_icmpgt | x | x |
| 0xa4 | if_icmple | x | x |
| 0xa5 | if_acmpeq | x | - |
| 0xa6 | if_acmpne | x | - |
| 0xa7 | goto | x | - |
| 0xa8 | jsr | x | - |
| 0xa9 | ret | x | - |
| 0xaa | tableswitch | x | - |
| 0xab | lookupswitch | x | - |
| 0xac | ireturn | x | x |
| 0xad | lreturn | x | - |
| 0xae | freturn | x | - |
| 0xaf | dreturn | x | - |
| 0xb0 | areturn | x | - |
| 0xb1 | return | x | x |
| 0xb2 | getstatic | x | - |
| 0xb3 | putstatic | x | - |
| 0xb4 | getfield | x | - |
| 0xb5 | putfield | x | - |
| 0xb6 | invokevirtual | x | x |
| 0xb7 | invokespecial | x | x |
| 0xb8 | invokestatic | x | x |
| 0xb9 | invokeinterface | x | - |
| 0xba | invokedynamic | ~ | - |
| 0xbb | new | x | x |
| 0xbc | newarray | - | - |
| 0xbd | anewarray | - | - |
| 0xbe | arraylength | - | - |
| 0xbf | athrow | - | - |
| 0xc0 | checkcast | - | - |
| 0xc1 | instanceof | - | - |
| 0xc2 | monitorenter | - | - |
| 0xc3 | monitorexit | - | - |
| 0xc4 | wide | - | - |
| 0xc5 | multianewarray | - | - |
| 0xc6 | ifnull | - | - |
| 0xc7 | ifnonnull | - | - |
| 0xc8 | goto_w | - | - |
| 0xc9 | jsr_w | - | - |
| 0xca | breakpoint | x | - |
| 0xfe | impdep1 | x | - |
| 0xff | impdep2 | x | - |

## Resources

[Class File Spec](https://docs.oracle.com/javase/specs/jvms/se19/html/jvms-2.html#jvms-2.1)
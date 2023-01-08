# java-web

A runtime environment for Java based on TypeScript.

## Current State

Currently the JVM manages to finish `System.initPhase1`.

The threading is currently in a mock state and does not actually work.

## Roadmap

- Implement some basic but actual threading
- Finish `System.initPhase2`
- Finish `System.initPhase3`
- Finish JVM initialization
- Run `Hello World` Programm successfully

## Resources

[Class File Spec](https://docs.oracle.com/javase/specs/jvms/se19/html/jvms-2.html#jvms-2.1)
# java-web

A runtime environment for Java based on TypeScript.

## Current State

Currently the JVM manages to finish `System.initPhase1` and fails execution after `238671` instructions.

## Roadmap

- [x] Finish `System.initPhase1`
- [x] Implement some basic threading
- [ ] Finish `System.initPhase2`
- [ ] Finish `System.initPhase3`
- [ ] Finish JVM initialization
- [ ] Run `Hello World` Programm successfully

## Resources

- [JVM v19 Specification](https://docs.oracle.com/javase/specs/jvms/se19/html/index.html)
- [Java 19 API Specification](https://download.java.net/java/early_access/panama/docs/api/index.html)
- [OpenJDK Implementation](https://github.com/openjdk/jdk)
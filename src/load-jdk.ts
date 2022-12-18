import * as fs from 'fs'
import path from 'path'

const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
	const files = fs.readdirSync(dirPath)
	files.forEach(function(file) {
		if (fs.statSync(dirPath + '/' + file).isDirectory()) {
			arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
		} else {
			arrayOfFiles.push(path.join(dirPath, '/', file))
		}
	})
	return arrayOfFiles
}

export const loadJDK = (): string[] => getAllFiles('jdk').map(file => file.substring(4))

import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from 'uuid';


class FileService {
    constructor(private savePath: string = path.join(process.cwd(), "public", "uploads")){}

    private generateFileName (fileName: string) {
        const now = (new Date()).getTime()
        const code = uuidv4()
        return `${now}__${code}__${fileName}`
    }

    public async uploadImage(file: File) {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        const fileName = this.generateFileName(file.name)
        if (!validImageTypes.includes(file.type)) {
            throw new Error('Invalid image type');
        }
        const buffer = Buffer.from(await file.arrayBuffer())
        await fs.promises.writeFile(path.join(this.savePath, fileName), buffer)
        return `/uploads/${fileName}`
    }

    public async deleteImage(fileName: string) {
        const filePath = path.join(process.cwd(), "public", fileName)
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath)
        } else {
            throw new Error('File not found');
        }
    }

    public async replaceImage (prevFileName: string, file: File) {
        await this.deleteImage(prevFileName)
        const replacedFileName = this.uploadImage(file)
        return replacedFileName
    }
}

export const fileService = new FileService()
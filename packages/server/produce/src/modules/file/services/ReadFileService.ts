import fs from 'fs'
import csvParser from 'csv-parse'

import { IMessageDTO } from '@modules/file/dtos/IMessageDTO'

interface IRequest {
  filePath: string
}

class ReadFileService {
  async execute ({ filePath }: IRequest): Promise<IMessageDTO[]> {
    const csvReadStream = fs.createReadStream(filePath, { encoding: 'utf-8' })

    const parser = csvParser({ delimiter: ',' })

    const pipe = csvReadStream.pipe(parser)

    return new Promise((resolve, reject) => {
      let infoCounter = 1

      const messages: IMessageDTO[] = []

      pipe.on('data', (chunk) => {
        messages.push({
          content: chunk,
          time: new Date().getTime()
        })

        if (infoCounter % 100000 === 0) {
          console.log(`Parsed ${infoCounter} records`)
        }

        infoCounter++
      })

      pipe.on('error', (err) => reject(err))

      pipe.on('end', () => resolve(messages))
    })
  }
}

export { ReadFileService }

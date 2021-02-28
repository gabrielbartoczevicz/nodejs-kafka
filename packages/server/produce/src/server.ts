import path from 'path'

import { ReadFileService } from '@modules/file/services/ReadFileService'
import { SendMessagesService } from '@modules/file/services/SendMessagesService'

const filePath = path.resolve(__dirname, '..', 'tmp', 'http-logs.csv')

const main = async (): Promise<void> => {
  const readFile = new ReadFileService()

  const messages = await readFile.execute({ filePath })

  const sendMessages = new SendMessagesService({ rate: 100 })

  sendMessages.execute(messages)
}

main()
  .catch((err) => console.error(err))
  .then(() => console.log('Done!'))

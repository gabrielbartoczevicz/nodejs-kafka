const { log } = console

class ProcessPaymentsService {
  public async execute (message: unknown): Promise<void> {
    log('Processing Message', message)

    if (message instanceof Map) {
      log('Iterating message\'s Map\n')

      message.forEach((val, key) => {
        log(`${key}: ${val}`)
      })
    }
  }
}

export { ProcessPaymentsService }

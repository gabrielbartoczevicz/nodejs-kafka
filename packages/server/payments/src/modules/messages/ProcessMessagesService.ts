class ProcessMessagesService {
  public async execute (message: any): Promise<void> {
    console.log('Processing Message', message)
  }
}

export { ProcessMessagesService }

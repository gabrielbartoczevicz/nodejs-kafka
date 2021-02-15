class ProcessPaymentsService {
  public async execute (message: unknown): Promise<void> {
    console.log('Processing Message', message)
  }
}

export { ProcessPaymentsService }

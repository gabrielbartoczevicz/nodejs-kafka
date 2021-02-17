export interface IEventConsumer {
  execute(message: Map<unknown, unknown>): Promise<void>
}

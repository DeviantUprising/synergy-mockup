export interface ICommand<IRequest, IResponse> {
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}

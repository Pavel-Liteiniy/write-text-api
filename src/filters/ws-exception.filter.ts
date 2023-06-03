import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

import { Socket } from 'socket.io';

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter<WsException> {
  catch(exception: WsException, host: ArgumentsHost) {
    super.catch(exception, host);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  handleError(client: Socket, exception: WsException): void {
    client.emit('exception', {
      message: exception.message,
      status: 'error',
    });
  }
}

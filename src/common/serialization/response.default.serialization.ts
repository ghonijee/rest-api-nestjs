import { ApiProperty } from '@nestjs/swagger';

export class ResponseDefaultSerialization<T = Record<string, any>> {
  @ApiProperty({
    name: 'status',
    type: Boolean,
    nullable: false,
    description: 'return specific OK status for every request',
    example: true,
  })
  status: boolean;

  @ApiProperty({
    name: 'statusCode',
    type: Number,
    nullable: false,
    description: 'return specific status code for every endpoints',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    name: 'message',
    nullable: false,
    description: 'Message base on language',
    oneOf: [
      {
        type: 'string',
        example: 'message endpoint',
      },
      {
        type: 'object',
        example: {
          en: 'This is test endpoint.',
          id: 'Ini adalah endpoint test',
        },
      },
    ],
  })
  message: string;

  data?: T;
}

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GenerateImageUrlInput {
  @Field()
  name: string

  @Field()
  fileType: string
}

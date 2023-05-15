import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './post';

@ObjectType()
export class Author {
  @Field((type) => Int)
  id: number;

  @Field((type) => [Post])
  posts: Post[];
}

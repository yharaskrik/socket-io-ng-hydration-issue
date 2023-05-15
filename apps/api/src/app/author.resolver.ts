import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { Author } from './author';
import { PubSub } from 'graphql-subscriptions';
import { Post } from './post';

const pubSub = new PubSub();

@Resolver((of) => Author)
export class AuthorsResolver {
  @Query((returns) => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return {
      id: '1',
    };
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return [];
  }

  @Subscription((returns) => Post)
  postAdded() {
    return pubSub.asyncIterator('postAdded');
  }
}

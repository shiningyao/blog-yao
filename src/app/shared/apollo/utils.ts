import {ObservableQuery} from 'apollo-client';
import {Observable as ApolloObservable} from 'apollo-client/util/Observable';
import {observeOn} from 'rxjs/operators';
import {
  Observable,
  Subscription,
  queueScheduler,
  SchedulerLike,
  SchedulerAction,
  observable,
} from 'rxjs';

export function fromPromise<T>(promiseFn: () => Promise<T>): Observable<T> {
  return new Observable<T>(subscriber => {
    promiseFn().then(
      result => {
        if (!subscriber.closed) {
          subscriber.next(result);
          subscriber.complete();
        }
      },
      error => {
        if (!subscriber.closed) {
          subscriber.error(error);
        }
      },
    );

    return () => subscriber.unsubscribe();
  });
}

export class ZoneScheduler implements SchedulerLike {
  constructor(private zone: Zone) {}

  public now = Date.now ? Date.now : () => +new Date();

  public schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay: number = 0,
    state?: T,
  ): Subscription {
    return this.zone.run(() =>
      queueScheduler.schedule(work, delay, state),
    ) as Subscription;
  }
}

// XXX: Apollo's QueryObservable is not compatible with RxJS
// TODO: remove it in one of future releases
// https://github.com/ReactiveX/rxjs/blob/9fb0ce9e09c865920cf37915cc675e3b3a75050b/src/internal/util/subscribeTo.ts#L32
export function fixObservable<T>(
  obs: ObservableQuery<T> | ApolloObservable<T>,
): ObservableQuery<T> | ApolloObservable<T> {
  (obs as any)[observable] = () => obs;
  return obs;
}

export function wrapWithZone<T>(obs: Observable<T>): Observable<T> {
  return obs.pipe(observeOn(new ZoneScheduler(Zone.current)));
}
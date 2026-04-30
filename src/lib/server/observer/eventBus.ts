import { enqueueJob } from '../queue/jobQueue';
import type { JobType, JobPayloadMap } from '../queue/jobTypes';

export const eventBus = {
  emit<T extends JobType>(type: T, payload: JobPayloadMap[T]) {
    return enqueueJob(type, payload);
  }
};
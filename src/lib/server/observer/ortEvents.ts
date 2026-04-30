import { eventBus } from './eventBus';
import { JobTypes } from '../queue/jobTypes';

export function ortUpdated(ortId: string) {
  return eventBus.emit(JobTypes.ORT_UPDATED, { ortId });
}

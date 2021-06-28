import { AudienceData } from './audience-data.model';
import { AudienceOverlapLink } from './audience-overlap-link.model';

export interface AudienceDataset {
  audiences: string[];
  audienceData: {
    [x: string]: AudienceData
  };
  overlapLinks: AudienceOverlapLink[];
}

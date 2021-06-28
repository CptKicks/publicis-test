import { AudienceOverlapLink } from './audience-overlap-link.model';

export interface ChartDataState {
  nodes: {
    name: string;
    depth: number;
    label?: { show: boolean },
    value?: number,
    itemStyle?: {
      color: string
  },
  }[];
  links: AudienceOverlapLink[];
  selected: string[];
}

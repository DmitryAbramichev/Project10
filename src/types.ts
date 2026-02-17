
export interface Launches {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  rocket: {
    rocket_name: string;
  };
  details: string | null;
  links: {
    mission_patch_small: string | null;
    mission_patch: string | null;
  };
}

export interface Hero {
  id: string;
  name: string;
  attackPower: number;
  defensePower: number;
  health: number;
}

export interface HeroRequest {
  name: string;
  attackPower: number;
  defensePower: number;
  health: number;
}

export interface AttackRequest {
  attackValue: number;
}

export interface MessageResponse {
  message: string;
}

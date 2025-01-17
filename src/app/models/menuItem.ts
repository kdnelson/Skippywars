import { Guid } from 'guid-typescript';

export class MenuItem {
  constructor(
    public id?: string,
    public name?: String,
    public manufacturer?: String,
    public cost?: number,
    public length?: String,
    public speed?: String,
    public crew?: String,
    public passengers?: String,
    public cargoCapacity?: String,
    public consumables?: String,
    public costRange?: String,
    public crewRange?: String,
  ){}
}
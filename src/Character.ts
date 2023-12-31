import Energy from './Energy';
import Fighter from './Fighter';
import Archetype, { Mage } from './Archetypes';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _archetype: Archetype;
  private _race: Race;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._defense = getRandomInt(1, 10);
    this._strength = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get race(): Race {
    return this._race;
  }
  
  get archetype(): Archetype {
    return this._archetype;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get maxLifePoints() {
    return this._maxLifePoints;
  }
  
  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy() { 
    return { ...this._energy };
  }

  public receiveDamage(attackPoints: number): number {
    const damege = attackPoints - this._defense;
    if (damege > 0) {
      this._lifePoints -= damege;
    } else if (damege <= 0) {
      this._lifePoints -= 1; 
    }
    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }
  
  public attack(enemy: Fighter): void {
    const attackDMG = this.strength;
    enemy.receiveDamage(attackDMG);
  }

  public levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
    if (this._maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
  }

  special?(enemy: Fighter): void {
    const royalAttack = this._strength + getRandomInt(4, 8);
    enemy.receiveDamage(royalAttack);
  }
}
import { ErrorMapper } from "utils/ErrorMapper";
import { Role, randomName} from "utils";
import { control } from "creepController"

const main = ErrorMapper.wrapLoop(() => {

  Object.values(Game.spawns).forEach( (spawn) => {
    spawn.spawnCreep(
      [WORK, CARRY, MOVE],
      randomName(),
      {
        memory: {
          role: Role.harvester,
          working : false},
      }
    );
  });

  Object.values(Game.creeps).forEach( (creep) => {

    control(creep);
  });

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});

module.exports.loop = main;

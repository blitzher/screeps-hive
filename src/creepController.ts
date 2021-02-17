import { Role } from "utils";

function controlDefault(creep : Creep) {

}

function controlHarvester(creep : Creep) {
    /* fetch more energy */

    const capacity = creep.store.getCapacity();

    if (!creep.memory.working && creep.store.energy === capacity) { creep.memory.working = true; }
    if (creep.memory.working && creep.store.energy === 0) {
        creep.memory.working = false;
    }

    if (!creep.memory.working) {
        const source = creep.room.find(FIND_SOURCES)[0];
        const status = creep.harvest(source);

        if (status < 0) {
            creep.moveByPath(creep.room.findPath(creep.pos, source.pos));
        }
        if (creep.store.energy === capacity) {
            creep.memory.working = true;
        }
    }
    /* deliver energy */
    else {
        const spawn = creep.room.find(FIND_MY_SPAWNS)[0];
        const status = creep.transfer(spawn, RESOURCE_ENERGY);

        if (status < 0) {
            creep.moveByPath(creep.room.findPath(creep.pos, spawn.pos));
        }

        if (creep.store.energy === 0) {
            creep.memory.working = false;
        }
    }
}

export function control(creep : Creep) {
    switch (creep.memory.role) {
        case Role.harvester:
            controlHarvester(creep); break;
        default:
            controlDefault(creep);
    }
};

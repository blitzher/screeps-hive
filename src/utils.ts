
// #region all role constants */
const harvester : string = "harvester";
const upgrader : string = "upgrader";

interface RoleType {
    harvester : string,
    upgrader : string,
}

export const Role : RoleType = {harvester, upgrader} ;

//#endregion

//#region random name generator
export function randomName() : string {
    const letters = "ABCDEFGH"
    let name : string = "";

    for(let i = 0; i<5; i++) {
        name += letters[ Math.floor(Math.random() * letters.length) ]
    }

    return name;
}

import { RD_CONSTANT  } from "../keys/constant";

export const filterUserId = team =>{
    return team.map( user =>{
        // return user;
        return user.split('-')[0];
    })
}
import { Injectable } from '@nestjs/common';
import { GetUserNoteDTO } from './dto';

@Injectable()
export class UserService {

    async getUsers(): Promise<GetUserNoteDTO> {
        const users: GetUserNoteDTO = {
            name: "hao",
            avar: "dsfs"
        }
        return users
    }

}

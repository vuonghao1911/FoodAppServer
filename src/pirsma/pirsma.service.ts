import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PirsmaService extends PrismaClient {
    constructor(configService: ConfigService) {
        super({
            datasources: {
                db: {
                    //we need to secure this !
                    //url: 'postgresql://postgres:Abc123456789@localhost:5434/testdb?schema=public'
                    url: configService.get('DATABASE_URL')
                }
            }
        })

    }
}

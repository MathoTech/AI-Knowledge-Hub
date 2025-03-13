import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BedrockService } from './bedrock/bedrock.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BedrockService],
})
export class AppModule {}

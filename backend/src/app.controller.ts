import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { BedrockService } from './bedrock/bedrock.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly bedrockService: BedrockService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('ask')
  async askQuestion(@Body() body: { question: string }): Promise<{ question: string; answer: string }> {
    console.log('Question received:', body.question);

    try {
      // Appel au service AWS Bedrock pour obtenir une vraie réponse
      const answer = await this.bedrockService.getAnswer(body.question);

      return {
        question: body.question,
        answer: answer || "Pas de réponse de l'IA.",
      };
    } catch (error) {
      console.error('Erreur lors de l’appel à Bedrock:', error);
      return {
        question: body.question,
        answer: "Erreur lors de l’appel à AWS Bedrock.",
      };
    }
  }
}

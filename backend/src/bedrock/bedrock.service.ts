import { Injectable } from '@nestjs/common';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class BedrockService {
  private bedrockClient: BedrockRuntimeClient;

  constructor() {
    this.bedrockClient = new BedrockRuntimeClient({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async getAnswer(question: string): Promise<string> {
    const params = {
      modelId: 'eu.amazon.nova-micro-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: [
              {
                text: question,
              },
            ],
          },
        ],
      }),
    };

    try {
      const command = new InvokeModelCommand(params);
      const response = await this.bedrockClient.send(command);

      const bodyString = new TextDecoder().decode(response.body);
      const responseData = JSON.parse(bodyString);
      const answer = responseData.output?.message?.content?.[0]?.text || 'No response available';
      console.log(answer)

      return answer;
    } catch (error) {
      console.error('Error calling AWS Bedrock:', error);
      throw new Error('Error in Bedrock API call');
    }
  }
}
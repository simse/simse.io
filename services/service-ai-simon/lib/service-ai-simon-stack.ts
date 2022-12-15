import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lex from 'aws-cdk-lib/aws-lex';
import * as iam from 'aws-cdk-lib/aws-iam';

import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'yaml';

export class ServiceAiSimonStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const botRole = new iam.Role(this, `ComputerSimonRole-${process.env.DEPLOYMENT_ENV}`, {
      assumedBy: new iam.ServicePrincipal('lexv2.amazonaws.com')
    });

    // load and convert intents
    const botFile = fs.readFileSync(path.join(__dirname, '..', 'bot.yaml'));
    const botDefinition = parse(botFile.toString());

    const intents = Object.keys(botDefinition['phrases']).map((phraseKey: any) => ({
      name: phraseKey,
      sampleUtterances: botDefinition['phrases'][phraseKey]['samples'].map((sample: string) => ({
        utterance: sample
      })),
      intentClosingSetting: {
        closingResponse: {
          messageGroupsList: [{
            message: {
              plainTextMessage: {
                value: botDefinition['phrases'][phraseKey]['responses'][0]
              }
            },
            variations: botDefinition['phrases'][phraseKey]['responses'].slice(1).map((response: string) => ({
              plainTextMessage: {
                value: response
              }
            }))
          }]
        }
      }
    }))

    const simonBot = new lex.CfnBot(this, `ComputerSimon-${process.env.DEPLOYMENT_ENV}`, {
      dataPrivacy: {
        ChildDirected: false
      },
      idleSessionTtlInSeconds: 120,
      name: `ComputerSimon-${process.env.DEPLOYMENT_ENV}`,
      roleArn: botRole.roleArn,
      autoBuildBotLocales: true,
      botLocales: [{
        localeId: 'en_US',
        nluConfidenceThreshold: 0.7,
        intents: [
          ...intents,
          {
            name: 'FallbackIntent',
            parentIntentSignature: 'AMAZON.FallbackIntent',
            intentClosingSetting: {
              closingResponse: {
                messageGroupsList: [{
                  message: {
                    plainTextMessage: {
                      value: 'I don\'t understand'
                    }
                  },
                  variations: [{
                    plainTextMessage: {
                      value: 'No clue'
                    }
                  }]
                }]
              }
            }
          }
        ]
      }]
    })
  }
}

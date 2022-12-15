#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ServiceAiSimonStack } from '../lib/service-ai-simon-stack';

const app = new cdk.App();
new ServiceAiSimonStack(app, `ServiceAiSimon-${process.env.DEPLOYMENT_ENV}`, {
  stackName: `ServiceAiSimon-${process.env.DEPLOYMENT_ENV}`,
  env: { account: '616657489041', region: 'eu-west-2' },
});
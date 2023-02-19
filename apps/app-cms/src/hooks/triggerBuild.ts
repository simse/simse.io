import { Octokit } from "octokit";
import { CollectionAfterChangeHook } from 'payload/types';

const octokit = new Octokit({
    auth: process.env.GITHUB_WEBHOOK_TOKEN,
});

const triggerBuild = async () => {
    const resp = await octokit.rest.actions.createWorkflowDispatch({
        owner: "simse",
        repo: "simse.io",
        workflow_id: "deploy-app-www.yaml",
        ref: "master",
    });

    return resp.status;
}

const triggerAfterChange: CollectionAfterChangeHook = async () => {
    await triggerBuild();
}

export {
    triggerAfterChange
}
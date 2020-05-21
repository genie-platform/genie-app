const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * A script for deploying the app
 *
 * The script builds the app, deploys to AWS S3 and then invalidates cloudfront
 *
 * We need to invalidate cloudfron so we could see the changes on the domain
 *
 * -----
 * The dapp is hosted on an AWS S3 bucket -
 * the bucket is used for Static website hosting.
 * When using S3 bucket for static website hosting we are given a URL for public access.

 * To deploy the dapp to the bucket we use the aws CLI tool using the command `yarn run deploy`

 * To install aws CLI tool follow these steps:
  https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html

 * To give access to the CLI tool we need an access key. To create an access key follow these steps:
 * https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/

 * A nice tutorial can be found here:
 * https://medium.com/serverlessguru/deploy-reactjs-app-with-s3-static-hosting-f640cb49d7e6
 */
async function deploy() {
  const BUILD_CMD = 'yarn build';
  const DEPLOY_CMD = 'aws s3 sync build/ s3://the-genie-app --acl public-read';
  const INVALIDATE_CMD =
    'aws cloudfront create-invalidation --distribution-id EEGKEN4AB5LE1 --paths "/*"';

  console.log('Starting the build and deploy proccess...');

  // build app locally to the /build folder
  console.log('\nBuilding project...');
  const build = await exec(BUILD_CMD);
  console.log(`Build stdout: ${build.stdout}`);
  console.log(`Build stderr: ${build.stderr ? build.stderr : 'no errors'}`);

  // deploy app (the /build folder) to S3 bucket
  console.log('\nDeploying project...');
  const deploy = await exec(DEPLOY_CMD);
  console.log(`Deploy stdout: ${deploy.stdout}`);
  console.log(`Deploy stderr: ${deploy.stderr ? deploy.stderr : 'no errors'}`);

  // invalidate cloudfront so we can see updated app
  // otherwise the site will update after 24h (the cloudfron cache update)
  console.log('\nInvalidating on cloudfront...');
  const invalidate = await exec(INVALIDATE_CMD);
  console.log(`Invalidate stdout: ${invalidate.stdout}`);
  console.log(
    `Invalidate stderr: ${invalidate.stderr ? invalidate.stderr : 'no errors'}`
  );

  console.log('\nDone!');
}

deploy();
